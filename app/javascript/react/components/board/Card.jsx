import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid'
import React, { useContext, useEffect, useState } from 'react'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { deleteCard } from './network'
import { deleteCardAction } from './reducer'
import { findColumn } from './utils'

export const Card = ({ card }) => {
  const board = useContext(BoardContext)
  const { dispatch, setEditCard } = useContext(BoardDispatchContext)
  const [isHovering, setIsHovering] = useState(false)
  const [column, setColumn] = useState(null)

  useEffect(() => {
    setColumn(findColumn(board, card.column_id))
  }, [board, card])

  if (!card || column?.collapsed) return null

  const onRemoveCard = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id, (deletedCard) => {
        dispatch(deleteCardAction(deletedCard))
      })
    }
  }

  const {
    job: { company_name, role }
  } = card

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-64 rounded-lg border bg-white px-4 py-4 shadow-md hover:border-gray-300 mb-3">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{role}</p>
            <p className="truncate text-sm text-gray-500">{company_name}</p>
          </div>
          {isHovering && (
            <div className="flex gap-2">
              <button onClick={onRemoveCard}>
                <TrashIcon
                  aria-hidden="true"
                  className="rounded-md size-5 text-red-100 hover:text-red-400"
                />
              </button>
              <button onClick={() => setEditCard(card)}>
                <PencilSquareIcon
                  aria-hidden="true"
                  className="rounded-md size-5 text-gray-300 hover:text-gray-400"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
