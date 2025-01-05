import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  ListBulletIcon,
  PencilIcon,
  ViewColumnsIcon
} from '@heroicons/react/16/solid'
import React, { useEffect, useState, useRef, useContext } from 'react'

import { useForm } from 'react-hook-form'
import { Outlet, useParams } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'

import { DashboardContext } from '../dashboard/DashboardContext'
import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'
import { Heading } from '../ui/heading'

import { Link } from '../ui/link'
import { Text } from '../ui/text'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import CardsList from './CardsList'
import Kanban from './Kanban'
import { collapseColumns, fetchBoard, updateBoard } from './network'
import {
  boardReducer,
  collapseColumnsAction,
  initBoardAction,
  updateBoardAction
} from './reducer'
import { classNames } from './utils'

export const Board = () => {
  const { board_id } = useParams()
  const [board, dispatch] = useImmerReducer(boardReducer, null)
  const [isEditingBoardName, setIsEditingBoardName] = useState(false)

  const { onPreferencesChange, preferences } = useContext(DashboardContext)
  const layout = preferences?.jobs_layout || 'kanban'

  const editBoardNameContainerRef = useRef(null)
  const boardForm = useForm()

  useEffect(() => {
    if (!board_id) return
    ;(async () => dispatch(initBoardAction(await fetchBoard(board_id))))()
  }, [dispatch, board_id])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        editBoardNameContainerRef.current &&
        !editBoardNameContainerRef.current.contains(event.target)
      ) {
        setIsEditingBoardName(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!board) return

    boardForm.register('name', { value: board.name })
  }, [boardForm, board])

  useEffect(() => {
    if (isEditingBoardName) {
      boardForm.setFocus('name')
    }
  }, [boardForm, isEditingBoardName])

  const handleLayoutChange = (newLayout) => {
    onPreferencesChange({ ...preferences, jobs_layout: newLayout })
  }

  const updateBoardName = async (data) => {
    setIsEditingBoardName(false)

    const updatedBoard = await updateBoard(board.id, { board: data })
    dispatch(updateBoardAction(updatedBoard))
  }

  if (!board) return null

  const boardName = isEditingBoardName ? (
    <form
      onSubmit={boardForm.handleSubmit(updateBoardName)}
      ref={editBoardNameContainerRef}
    >
      <input
        type="text"
        {...boardForm.register('name')}
        className="sm:text-xl/8 font-semibold border-0 text-gray-900 focus:ring-0 p-0"
      />
    </form>
  ) : (
    <div>
      <Heading onClick={() => setIsEditingBoardName(true)}>
        {board.name}
      </Heading>
    </div>
  )

  const breadcrumb = (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li key="boards">
          <div>
            <Link className="flex items-center" href={`/dashboard/boards`}>
              <Text>Boards</Text>
            </Link>
          </div>
        </li>
        <li key="job">
          <div className="flex items-center space-x-2">
            <ChevronRightIcon
              aria-hidden="true"
              className="size-5 text-gray-400"
            />
            {boardName}
          </div>
        </li>
      </ol>
    </nav>
  )

  const selectedLayoutClassNames = 'ml-0.5 rounded-md bg-white p-1.5 shadow-xs'
  const unSelectedLayoutClassNames =
    'rounded-md p-1.5  hover:bg-white hover:shadow-xs'
  const commonLayoutClassNames =
    'text-gray-400 focus:ring-2 focus:outline-hidden focus:ring-inset'

  return (
    <BoardContext.Provider value={board}>
      <BoardDispatchContext.Provider value={dispatch}>
        <div className="flex items-center justify-between">
          {breadcrumb}
          <div className="flex gap-2">
            <div className="ml-6 rounded-lg bg-gray-100 p-0.5 flex">
              <Button
                plain
                className={classNames(
                  layout === 'kanban'
                    ? selectedLayoutClassNames
                    : unSelectedLayoutClassNames,
                  commonLayoutClassNames
                )}
                onClick={() => handleLayoutChange('kanban')}
              >
                <ViewColumnsIcon />
              </Button>
              <Button
                plain
                className={classNames(
                  layout === 'list'
                    ? selectedLayoutClassNames
                    : unSelectedLayoutClassNames,
                  commonLayoutClassNames
                )}
                onClick={() => handleLayoutChange('list')}
              >
                <ListBulletIcon />
              </Button>
            </div>
            <Dropdown>
              <DropdownButton plain aria-label="More options">
                <EllipsisHorizontalIcon />
              </DropdownButton>
              <DropdownMenu anchor="bottom end">
                <DropdownItem plain onClick={() => setIsEditingBoardName(true)}>
                  <PencilIcon />
                  Edit board name
                </DropdownItem>
                {layout === 'kanban' && (
                  <>
                    <DropdownItem
                      plain
                      onClick={() => {
                        dispatch(collapseColumnsAction(true))
                        collapseColumns(board.id, true)
                      }}
                    >
                      <ArrowsPointingInIcon />
                      Collapse all
                    </DropdownItem>
                    <DropdownItem
                      plain
                      onClick={() => {
                        dispatch(collapseColumnsAction(false))
                        collapseColumns(board.id, false)
                      }}
                    >
                      <ArrowsPointingOutIcon />
                      Expand all
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {layout === 'kanban' && (
          <>
            <Text>Scroll to the right to see more stages</Text>
            <Divider className="my-4" />
            <Kanban board={board} />
          </>
        )}
        {layout === 'list' && (
          <>
            <Text>Select a stage to filter jobs</Text>
            <CardsList board={board} />
          </>
        )}
        <Outlet />
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}
