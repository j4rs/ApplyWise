import { ChevronRightIcon, ViewColumnsIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Link } from '../ui/link'

import { fetchBoard, fetchJob } from './network'
import { Divider } from '../ui/divider'

export const Job = () => {
  const { board_id, job_id } = useParams()
  const [board, setBoard] = useState(null)
  const [job, setJob] = useState(null)

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

  // fetch job
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
              <ViewColumnsIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400"
              />
              {board.name}
            </Link>
          </div>
        </li>
        <li key="job">
          <div className="flex items-center gap-2">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-gray-400"
            />
            {job.role}
          </div>
        </li>
      </ol>
    </nav>
  )

  return (
    <>
      {buildBreadcrumb()}
      <Divider className="my-4" />
    </>
  )
}
