import { ChevronRightIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { fetchBoard, fetchJob } from '../board/network'
import { Heading } from '../ui/heading'
import { Link } from '../ui/link'

import { Text } from '../ui/text'

import { JobContext } from './JobContext'
import { Tabs } from './Tabs'

export const Job = () => {
  const { board_id, job_id } = useParams()

  const [board, setBoard] = useState(null)
  const [job, setJob] = useState(null)

  const [activeTab, setActiveTab] = useState('details')

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
        <li key="job">
          <div className="flex items-center space-x-2">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-5 text-gray-400"
            />
            <Heading className="!text-zinc-500">
              {job.role} :: {job.company_name}
            </Heading>
          </div>
        </li>
      </ol>
    </nav>
  )

  return (
    <JobContext.Provider value={job}>
      <div className="flex flex-col gap-4">
        {buildBreadcrumb()}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Outlet />
      </div>
    </JobContext.Provider>
  )
}
