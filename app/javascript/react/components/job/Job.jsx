import { ChevronRightIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { fetchBoard, fetchJob } from '../board/network'
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
      <ol className="flex items-center">
        <li key="board">
          <div>
            <Link
              className="flex items-center gap-2"
              href={`/dashboard/boards/${board_id}`}
            >
              <Text>{board.name}</Text>
            </Link>
          </div>
        </li>
        <li key="job">
          <div className="flex items-center gap-2">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-5 text-gray-400"
            />
            <Text className="flex items-center gap-2">
              <span className="text-xl font-semibold">{job.role}</span>
              <span className="font-semibold">::</span>
              <span className="text-xl font-semibold">{job.company_name}</span>
            </Text>
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
