import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Board } from './components/board/Board'

import { Boards } from './components/board/Boards'
import { Dashboard } from './components/dashboard/Dashboard'
import { ErrorPage } from './components/error/ErrorPage'
import { CoverLetterTab } from './components/job/CoverLetterTab'
import { DetailsTab } from './components/job/DetailsTab'
import { InterviewPrepTab } from './components/job/InterviewPrepTab'
import { Job } from './components/job/Job'
import { ResumeTab } from './components/job/ResumeTab'
import { Profile } from './components/profile/Profile'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Boards />,
        path: '/dashboard/boards'
      },
      {
        element: <Board />,
        path: '/dashboard/boards/:board_id'
      },
      {
        children: [
          {
            element: <DetailsTab />,
            path: 'details'
          },
          {
            element: <ResumeTab />,
            path: 'resume'
          },
          {
            element: <CoverLetterTab />,
            path: 'cover_letter'
          },
          {
            element: <InterviewPrepTab />,
            path: 'interview_prep'
          }
        ],
        element: <Job />,
        path: '/dashboard/boards/:board_id/jobs/:job_id'
      },
      {
        element: <Profile />,
        path: '/dashboard/profile'
      }
    ],
    element: <Dashboard />,
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
