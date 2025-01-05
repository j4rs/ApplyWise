import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Board } from './components/board/Board'

import { Boards } from './components/board/Boards'
import { Dashboard } from './components/dashboard/Dashboard'
import { ErrorPage } from './components/error/ErrorPage'
import { Inbox } from './components/inbox/Inbox'
import { Application } from './components/job/Application'
import { CoverLetterTab } from './components/job/CoverLetterTab'
import { DetailsTab } from './components/job/DetailsTab'
import { InterviewPrepTab } from './components/job/InterviewPrepTab'
import { Job } from './components/job/Job'
import { ResumeTab } from './components/job/ResumeTab'
import { Basic } from './components/profile/Basic'
import { Build } from './components/profile/Build'
import { Profile } from './components/profile/Profile'
import { PubSub } from './pubsub/PubSub'

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
            element: <Application />,
            path: 'application'
          },
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
        children: [
          {
            element: <Basic />,
            path: 'basic'
          },
          {
            element: <Build />,
            path: 'build'
          }
        ],
        element: <Profile />,
        path: '/dashboard/profile'
      },
      {
        element: <Inbox />,
        path: '/dashboard/notifications'
      }
    ],
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    path: '/dashboard'
  }
])

function App() {
  const routerProvider = (
    <PubSub>
      <RouterProvider router={router} />
    </PubSub>
  )
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
