import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Board } from './components/board/Board'

import { Boards } from './components/board/Boards'
import { Job } from './components/board/Job'
import { StackedLayoutDashboard } from './components/dashboard/StackedLayoutDashboard'
import { ErrorPage } from './components/error/ErrorPage'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Boards />,
        path: '/dashboard/boards'
      },
      {
        children: [
          {
            element: <Job />,
            path: 'jobs/:job_id'
          }
        ],
        element: <Board />,
        path: '/dashboard/boards/:board_id'
      }
    ],
    element: <StackedLayoutDashboard />,
    errorElement: <ErrorPage />,
    path: '/dashboard'
  }
])

function App() {
  const routerProvider = <RouterProvider router={router} />
  // REACT_APP_RAILS_ENV is set by esbuild.config.js when building the app
  if (process.env.REACT_APP_RAILS_ENV === 'production') return routerProvider
  return <React.StrictMode>{routerProvider}</React.StrictMode>
}

document.addEventListener('turbo:load', () => {
  const app = document.getElementById('react-app-root')

  if (app) {
    const root = createRoot(app)
    root.render(<App />)

    document.addEventListener('turbo:before-visit', () => {
      root.unmount()
    })
  }
})
