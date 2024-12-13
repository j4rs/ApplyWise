import { ControlledBoard } from '@caldwell619/react-kanban'
import { PlusIcon } from '@heroicons/react/16/solid'
import React, { useContext } from 'react'

import { Button } from '../ui/button'

import { BoardDispatchContext } from './BoardContext'
import { Card } from './Card'
import { Column } from './Column'
import { DeleteCardDialog } from './DeleteCardDialog'
import { EditCard } from './EditCard'
import { useDeleteCard } from './hooks/useDeleteCard'
import { createColumn, moveCard, moveColumn } from './network'
import { createColumnAction, moveCardAction, moveColumnAction } from './reducer'
import { randomColor } from './utils'

export default function Kanban({ board }) {
  const dispatch = useContext(BoardDispatchContext)
  const [editCard, setEditCard] = React.useState(null)

  const { onRemoveCard, removeCard, setRemoveCard } = useDeleteCard()

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
      column: { color: randomColor(), name: 'New stage name' }
    })
    dispatch(createColumnAction(column))
  }

  return (
    <>
      <ControlledBoard
        allowAddCard={false}
        allowAddColumn={true}
        allowRemoveCard={false}
        allowRemoveColumn={false}
        allowRenameColumn={false}
        onCardDragEnd={onCardDragEnd}
        onColumnDragEnd={onColumnDragEnd}
        renderCard={(card) => (
          <Card
            card={card}
            setEditCard={setEditCard}
            setRemoveCard={setRemoveCard}
          />
        )}
        renderColumnAdder={() => (
          <Button
            outline
            className="min-w-64 text-zinc-950/50"
            onClick={onAddColumn}
          >
            <PlusIcon />
            Add new stage
          </Button>
        )}
        renderColumnHeader={(column) => (
          <Column column={column} onNewCard={(card) => setEditCard(card)} />
        )}
      >
        {board}
      </ControlledBoard>
      {editCard && (
        <EditCard isOpen card={editCard} onClose={() => setEditCard(null)} />
      )}
      <DeleteCardDialog
        isOpen={removeCard !== null}
        onClose={() => setRemoveCard(null)}
        onConfirm={() => onRemoveCard(removeCard)}
      />
    </>
  )
}
