import { ControlledBoard } from '@caldwell619/react-kanban'
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  EllipsisHorizontalIcon,
  ListBulletIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/16/solid'
import React, { useEffect, useState, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { Outlet, useParams } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'

import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'
import { Heading } from '../ui/heading'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { Card } from './Card'
import { Column } from './Column'
import { EditCard } from './EditCard'
import {
  collapseColumns,
  createColumn,
  fetchBoard,
  moveCard,
  moveColumn,
  updateBoard
} from './network'
import {
  boardReducer,
  collapseColumnsAction,
  createColumnAction,
  initBoardAction,
  moveCardAction,
  moveColumnAction,
  updateBoardAction
} from './reducer'

export const Board = () => {
  const { board_id } = useParams()
  const [board, dispatch] = useImmerReducer(boardReducer, null)
  const [editCard, setEditCard] = useState(null)
  const [isEditingBoardName, setIsEditingBoardName] = useState(false)

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

  const onCardDragEnd = (card, source, destination) => {
    const from = {
      column_id: source.fromColumnId,
      position: source.fromPosition
    }

    const to = {
      column_id: destination.toColumnId,
      position: destination.toPosition
    }

    moveCard(card, from, to)
    dispatch(moveCardAction(card, source, destination))
  }

  const onColumnDragEnd = (column, source, destination) => {
    moveColumn(board.id, column, source.fromPosition, destination.toPosition)
    dispatch(moveColumnAction(column, source, destination))
  }

  const onAddColumn = async () => {
    const column = await createColumn(board.id, {
      column: { color: 'light', name: 'View name' }
    })
    dispatch(createColumnAction(column))
  }

  const updateBoardName = async (data) => {
    setIsEditingBoardName(false)

    const updatedBoard = await updateBoard(board.id, { board: data })
    dispatch(updateBoardAction(updatedBoard))
  }

  if (!board) return null

  return (
    <BoardContext.Provider value={board}>
      <BoardDispatchContext.Provider value={{ dispatch, setEditCard }}>
        <div className="flex items-center justify-between gap-2">
          {isEditingBoardName ? (
            <form
              onSubmit={boardForm.handleSubmit(updateBoardName)}
              ref={editBoardNameContainerRef}
            >
              <input
                type="text"
                {...boardForm.register('name')}
                className="sm:text-xl/8 font-semibold border-0 text-gray-900 focus:ring-0 p-2"
              />
            </form>
          ) : (
            <div className="hover:bg-zinc-100 rounded-md p-2">
              <Heading
                className="hover:bg-zinc-100"
                onClick={() => setIsEditingBoardName(true)}
              >
                {board.name}
              </Heading>
            </div>
          )}
          <Dropdown>
            <DropdownButton plain aria-label="More options">
              <EllipsisHorizontalIcon />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              <DropdownItem plain onClick={() => setIsEditingBoardName(true)}>
                <PencilIcon />
                Edit board name
              </DropdownItem>
              <DropdownItem
                plain
                onClick={() => {
                  dispatch(collapseColumnsAction(true))
                  collapseColumns(board.id, true)
                }}
              >
                <ArrowsPointingInIcon />
                Collapse all views
              </DropdownItem>
              <DropdownItem
                plain
                onClick={() => {
                  dispatch(collapseColumnsAction(false))
                  collapseColumns(board.id, false)
                }}
              >
                <ArrowsPointingOutIcon />
                Expand all views
              </DropdownItem>
              <DropdownItem href={`/dashboard/boards`}>
                <ListBulletIcon />
                Manage boards
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Divider className="my-4" />
        {board && (
          <ControlledBoard
            allowAddCard={false}
            allowAddColumn={true}
            allowRemoveCard={false}
            allowRemoveColumn={false}
            allowRenameColumn={false}
            onCardDragEnd={onCardDragEnd}
            onColumnDragEnd={onColumnDragEnd}
            renderCard={(card) => <Card card={card} />}
            renderColumnAdder={() => (
              <Button
                outline
                className="min-w-64 text-zinc-950/50"
                onClick={onAddColumn}
              >
                <PlusIcon />
                Add new view
              </Button>
            )}
            renderColumnHeader={(column) => (
              <Column column={column} onNewCard={(card) => setEditCard(card)} />
            )}
          >
            {board}
          </ControlledBoard>
        )}
        {editCard && (
          <EditCard isOpen card={editCard} onClose={() => setEditCard(null)} />
        )}
        <Outlet />
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}
