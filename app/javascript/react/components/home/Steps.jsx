import React from 'react'
import { Outlet } from 'react-router-dom'

import { classNames } from '../board/utils'
import { Heading } from '../ui/heading'
import { Link } from '../ui/link'
import { Text } from '../ui/text'

const STEPS = [
  {
    description:
      "If you don't have a resume, you can add your skills manually to your profile.",
    href: 'step-one',
    id: 'Step 1 - Upload your resume',
    name: 'Upload your resume',
    status: 'current'
  },
  {
    description: 'You can visit the job board to add more jobs.',
    href: 'step-two',
    id: 'Step 2 - Create your first job',
    name: 'Create your first job',
    status: 'upcoming'
  },
  {
    description:
      'An AI assistant will generate a tailored resume and cover letters for you.',
    href: 'step-three',
    id: 'Step 3 - Apply to the job',
    name: 'Apply to the job',
    status: 'upcoming'
  }
]

export const RenderSteps = ({ steps }) => (
  <nav aria-label="Progress">
    <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
      {steps.map((step) => {
        const linkContent = (
          <span
            className={`text-lg font-medium ${
              step.status === 'complete' || step.status === 'current'
                ? 'text-blue-600 group-hover:text-blue-800'
                : 'text-gray-400 group-hover:text-gray-600'
            }`}
          >
            {step.id}
          </span>
        )

        const linkClass = `group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
          step.status === 'complete' || step.status === 'current'
            ? 'border-blue-600 hover:border-blue-800'
            : 'border-gray-200 hover:border-gray-300'
        }`

        return (
          <li className="md:flex-1" key={step.id}>
            <Link
              className={linkClass}
              href={step.href}
              {...(step.status === 'current' ? { 'aria-current': 'step' } : {})}
            >
              {linkContent}
            </Link>
            <Text
              className={classNames(
                'mt-2',
                step.status !== 'current' && '!text-gray-400'
              )}
            >
              {step.description}
            </Text>
          </li>
        )
      })}
    </ol>
  </nav>
)

export const Steps = () => (
  <>
    <Heading>Welcome, start your journey to a better job here.</Heading>
    <Text>
      We&apos;ll help you build your resume, cover letter, prepare for
      interviews, and ultimately get hired. It&apos;s free and easy.
    </Text>
    <div className="flex flex-col gap-6 mt-6">
      <RenderSteps steps={STEPS} />
      <Outlet />
    </div>
  </>
)
