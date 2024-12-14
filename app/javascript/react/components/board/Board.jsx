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
      <Heading
        className="hover:bg-zinc-100 !text-zinc-500"
        onClick={() => setIsEditingBoardName(true)}
      >
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

  return (
    <BoardContext.Provider value={board}>
      <BoardDispatchContext.Provider value={dispatch}>
        <div className="flex items-center justify-between">
          {breadcrumb}
          <div className="flex justify-end gap-2">
            <Button
              plain
              className={
                layout === 'kanban' ? 'bg-zinc-100 border-zinc-200' : ''
              }
              onClick={() => handleLayoutChange('kanban')}
            >
              <ViewColumnsIcon />
            </Button>
            <Button
              plain
              className={layout === 'list' ? 'bg-zinc-100 border-zinc-200' : ''}
              onClick={() => handleLayoutChange('list')}
            >
              <ListBulletIcon />
            </Button>
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
