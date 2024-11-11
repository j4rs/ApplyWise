import React from 'react'
import { createRoot } from 'react-dom/client'
import { Dashboard } from './components/dashboard/Dashboard'

function App() {
  return <Dashboard />;
}

document.addEventListener("turbo:load", () => {
  console.log('App is loaded')
  const app = document.getElementById("react-app-root")

  if (app) {
    const root = createRoot(app)
    root.render(<App />)

    document.addEventListener("turbo:before-visit", () => {
      root.unmount();
    })
  }
})
