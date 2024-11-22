import { ControlledBoard } from '@caldwell619/react-kanban'
import { PlusIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

import { useImmerReducer } from 'use-immer'

import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import { Heading } from '../ui/heading'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { Card } from './Card'
import { Column } from './Column'
import { EditCard } from './EditCard'
import {
  createColumn,
  deleteCard,
  fetchBoard,
  moveCard,
  moveColumn
} from './network'
import {
  boardReducer,
  createColumnAction,
  deleteCardAction,
  initBoardAction,
  moveCardAction,
  moveColumnAction
} from './reducer'

export const Board = () => {
  const [board, dispatch] = useImmerReducer(boardReducer, null)
  const [editCard, setEditCard] = useState(null)

  useEffect(() => {
    fetchBoard((initialBoard) => dispatch(initBoardAction(initialBoard)))
  }, [])

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
    moveColumn(column, source.fromPosition, destination.toPosition)
    dispatch(moveColumnAction(column, source, destination))
  }

  const onAddColumn = () => {
    createColumn(
      { column: { color: 'light', name: 'New column' } },
      (column) => {
        dispatch(createColumnAction(column))
      }
    )
  }

  console.log(board)

  if (!board) return null

  return (
    <BoardContext.Provider value={board}>
      <BoardDispatchContext.Provider value={{ dispatch, setEditCard }}>
        <div className="flex items-center justify-between">
          <Heading className="">Board</Heading>
          <Button plain className="cursor-pointer" onClick={onAddColumn}>
            <PlusIcon className="h-4 w-4" />
            Add column
          </Button>
        </div>
        <Divider className="my-4" />
        {board && (
          <ControlledBoard
            allowAddCard={false}
            allowAddColumn={false}
            allowRemoveCard={false}
            allowRemoveColumn={false}
            allowRenameColumn={false}
            onCardDragEnd={onCardDragEnd}
            onColumnDragEnd={onColumnDragEnd}
            renderCard={(card) => <Card card={card} />}
            renderColumnHeader={(column) => (
              <Column column={column} onNewCard={(card) => setEditCard(card)} />
            )}
          >
            {board}
          </ControlledBoard>
        )}
        {editCard && (
          <EditCard
            isOpen
            card={editCard}
            onClose={() => setEditCard(null)}
            onDelete={(cardId) => {
              const callback = (deletedCard) => {
                dispatch(deleteCardAction(deletedCard))
              }

              deleteCard(cardId, callback)
              setEditCard(null)
            }}
            onSave={() => null}
          />
        )}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}
