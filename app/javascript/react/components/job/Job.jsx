import { ChevronRightIcon } from '@heroicons/react/16/solid'
import {
  AtSymbolIcon,
  DocumentIcon,
  EnvelopeIcon,
  PencilSquareIcon
} from '@heroicons/react/20/solid'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { fetchBoard, fetchJob } from '../board/network'
import { classNames } from '../board/utils'
import { useTabs } from '../hooks/useTabs'
import { Heading } from '../ui/heading'
import { Link } from '../ui/link'

import { Text } from '../ui/text'

import { JobContext } from './JobContext'

const TABS = [
  {
    href: 'details',
    icon: PencilSquareIcon,
    key: 'details',
    name: 'Details'
  },
  {
    href: 'application',
    icon: AtSymbolIcon,
    key: 'application',
    name: 'Application'
  },
  { href: 'resume', icon: DocumentIcon, key: 'resume', name: 'Resume' },
  {
    href: 'cover_letter',
    icon: EnvelopeIcon,
    key: 'cover_letter',
    name: 'Cover Letter'
  },
  {
    href: 'interview_prep',
    icon: ChatBubbleLeftRightIcon,
    key: 'interview_prep',
    name: 'Interview Prep'
  }
]

export const Job = () => {
  const { board_id, job_id } = useParams()

  const [board, setBoard] = useState(null)
  const [job, setJob] = useState(null)

  const { tabsUI } = useTabs(TABS)

  const asyncFetchJob = async () => {
    const fetchedJob = await fetchJob(board_id, job_id)
    setJob(fetchedJob)
  }

  const asyncFetchBoard = async () => {
    const fetchedBoard = await fetchBoard(board_id)
    setBoard(fetchedBoard)
  }

  useEffect(() => {
    asyncFetchBoard()
  }, [board_id])

  useEffect(() => {
    if (!job_id) return

    asyncFetchJob()
  }, [board_id, job_id])

  if (!board) return null
  if (!job) return null

  const buildBreadcrumb = () => (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li key="boards">
          <div>
            <Link className="flex items-center" href={`/dashboard/boards`}>
              <Text>Boards</Text>
            </Link>
          </div>
        </li>
        <li key="board">
          <div className="flex items-center space-x-2">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-5 text-gray-400"
            />
            <Link
              className="flex items-center"
              href={`/dashboard/boards/${board_id}`}
            >
              <Text>{board.name}</Text>
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  )

  const highlight = 'bg-indigo-50 rounded-md px-2 py-0.5'

  return (
    <JobContext.Provider value={job}>
      <div className="flex flex-col gap-4">
        {buildBreadcrumb()}
        <Heading>
          {job.role} :: {job.company_name}
        </Heading>
        <Text>
          Use your{' '}
          <span className={classNames(highlight, '!bg-red-100')}>
            AI assistants
          </span>{' '}
          to respond <span className={highlight}>Custom Questions</span>,
          generate the <span className={highlight}>Resume</span> and{' '}
          <span className={highlight}>Cover Letter</span>. Track the application
          with <i>notes, tags, contacts</i>, and more.
        </Text>
        {tabsUI}
        <Outlet />
      </div>
    </JobContext.Provider>
  )
}
