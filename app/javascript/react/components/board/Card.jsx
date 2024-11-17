import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid'
import React, { useContext, useEffect, useState } from 'react'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { deleteCard } from './network'
import { deleteCardAction } from './reducer'

const findBoardCard = (board, cardId) =>
  board.columns.flatMap((c) => c.cards).find((c) => c.id === cardId)

export const Card = ({ card, options, selectCard }) => {
  const board = useContext(BoardContext)
  const dispatch = useContext(BoardDispatchContext)

  const [controlledCard, setControlledCard] = useState(null)
  const [isHovering, setIsHovering] = useState(false)

  const { removeCard } = options

  useEffect(() => {
    // console.log('Re-rendering', card)
    setControlledCard(findBoardCard(board, card.id))
  }, [board, card.id])

  if (!controlledCard) return null

  const onRemoveCard = () => {
    deleteCard(card.id, (deletedCard) => {
      dispatch(deleteCardAction(deletedCard))
      removeCard(card)
    })
  }

  const {
    job: { company_name, role }
  } = controlledCard

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-64 relative flex space-x-3 rounded-lg border bg-white px-4 py-4 shadow-md hover:border-gray-300 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{role}</p>
          <p className="truncate text-sm text-gray-500">{company_name}</p>
        </div>
        {isHovering && (
          <>
            <button
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 mx-6"
              onClick={() => selectCard(controlledCard)}
            >
              <PencilSquareIcon aria-hidden="true" className="size-5" />
            </button>
            <button
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 mx-6"
              onClick={onRemoveCard}
            >
              <TrashIcon aria-hidden="true" className="size-5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
