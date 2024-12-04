/* eslint-disable */

const { glob } = require('glob');

const chokidar = require('chokidar')
const esbuild = require('esbuild')
const http = require('http')

const envPaths = ['.env', '.env.development', '.env.local', '.env.development.local']
const fs = require('fs')
const dotenv = require('dotenv');

let envObject = {}
// Iterate through env and apply the values based on precedence.
envPaths.forEach((v) => {
  if (fs.existsSync(v)) {
    if (Object.keys(envObject).length === 0) {
      console.log(`Using env file: '${v}'`)
    } else {
      console.log(`Merging keys from env file: '${v}'`)
    }
    envObject = { ...envObject, ...dotenv.parse(fs.readFileSync(v)) }
  }
})

if (Object.keys(envObject).length > 0) {
  dotenv.populate(process.env, envObject)
} else {
  console.log('Did not load environment file.')
}

// Add more entrypoints, if needed
const entryPoints = [
  "app/javascript/application.js"
]

const esbuildUpdateServerPort = process.env.ESBUILD_UPDATE_SERVER_PORT || '3036'

const shouldWatch = process.argv.includes('--watch')
const ignoreRefresh = process.argv.includes('--ignore-refresh')

const watchedDirectories = [
  "./app/javascript/**/*.{js,ts,jsx,tsx,json}",
  "./app/assets/stylesheets/**/*.css"
]

const ignoredFiles = []

const buildConfig = {
  bundle: true,
  entryPoints: entryPoints,
  outdir: "app/assets/builds",
  publicPath: "/assets",
  sourcemap: true,
  plugins: [],
  banner: {
    js: `(() => new EventSource("http://localhost:${esbuildUpdateServerPort}").onmessage = () => location.reload())();`,
  },
  define: {
    'process.env.REACT_APP_RAILS_ENV': JSON.stringify(process.env.REACT_APP_RAILS_ENV)
  }
}

if (shouldWatch) {
  (async () => {
    const clients = []

    http
      .createServer((_, res) => {
        res.on('close', () => {
          const index = clients.indexOf(res)
          if (index >= 0) {
            clients.splice(index, 1)
          }
        })
        return clients.push(
          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
          })
        );
      })
      .listen(esbuildUpdateServerPort);

    const initialBuild = () => esbuild
      .context(buildConfig)
      .catch((error) => {
        console.log(error)
        if (!shouldWatch) {
          process.exit(1)
        }
      })

    let errorOnLastBuild = false
    const handleError = (err) => {
      // Log to build console.
      console.log(err)
      errorOnLastBuild = true

      const errMessages = err.errors.filter((e) => e.pluginName !== 'esbuild:cleanup')
      const dataErrMsg = errMessages
        .map(
          (e) =>
            `${e.location.file}:${e.location.line}:${e.location.column}: ERROR: ${e.text}`
        ).join('\n')
      // Push to WS/ES so that dev sees the message.
      // Note: this is read in application_base.js
      clients.forEach((res) => res.write("data: _ERROR_" + JSON.stringify(dataErrMsg) + "\n\n"))
    }

    let context = await initialBuild()
    await context.rebuild().catch((err) => {
      console.error(err)
    });

    console.log('❤❤❤❤❤ WATCH ❤❤❤❤❤ Initial asset build complete...')

    let counter = 0
    console.log('❤❤❤❤❤ WATCH ❤❤❤❤❤ Your assets are being watched...')

    let lastTimeoutId = null
    const rebuildPaths = []

    const debounceRebuild = (event, path) => {
      const internalRebuild = async (event, paths) => {
        if (event === "change") {
          console.log(`❤❤❤❤❤ WATCH ❤❤❤❤❤  Rebuilding`);
          console.log('The following files changed:')
          console.log(paths)

          const iteration = counter++

          console.time(`❤❤❤❤❤ WATCH ❤❤❤❤❤  Done ${iteration}`);
          errorOnLastBuild = false

          await context.rebuild({}).catch(handleError);

          console.timeEnd(`❤❤❤❤❤ WATCH ❤❤❤❤❤  Done ${iteration}`);
          if (errorOnLastBuild) {
            console.log("!!! LAST BUILD FAILED !!!")
          }

          // if the --ignore-refresh argument is passed, do not automatically refresh browser pages when
          // files are saved
          if (!ignoreRefresh && !errorOnLastBuild) {
            clients.forEach((res) => res.write("data: update\n\n"));
          }
          // TODO: if we have ignore refresh here we could add a toast that tells
          //  them a build succeeded and give them a refresh button??
        }
      }
      if (lastTimeoutId) {
        clearTimeout(lastTimeoutId)
      }

      rebuildPaths.push(path)
      lastTimeoutId = setTimeout(() => {
        const paths = [...rebuildPaths]
        rebuildPaths.splice(0, rebuildPaths.length)
        internalRebuild(event, paths)
      }, 50)
    }

    chokidar.watch(await glob(watchedDirectories), { ignored: ignoredFiles }).on("all", debounceRebuild);
  })()
} else {
  esbuild.build({
    ...buildConfig,
    minify: process.env.RAILS_ENV == "production",
  }).catch(() => process.exit(1));
}
