import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Board } from './components/board/Board'

import { Boards } from './components/board/Boards'
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
        element: <Board />,
        path: '/dashboard/boards/:id'
      }
    ],
    element: <StackedLayoutDashboard />,
    errorElement: <ErrorPage />,
    path: '/dashboard'
  }
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
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
