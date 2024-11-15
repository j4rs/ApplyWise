import React from 'react'
import { createRoot } from 'react-dom/client'
import { Dashboard } from './components/dashboard/Dashboard'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './components/error/ErrorPage'
import { Board } from './components/board/Board'

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "board",
        element: <Board />,
      },
    ],
  }
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
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
