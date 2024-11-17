import { UncontrolledBoard } from '@caldwell619/react-kanban'
import React, { useEffect, useState } from 'react'

import { useImmerReducer } from 'use-immer'

import { Divider } from '../ui/divider'
import { Heading } from '../ui/heading'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { Card } from './Card'
import { Column } from './Column'
import { EditCard } from './EditCard'
import { deleteCard, fetchBoard, moveCard, updateBoard } from './network'
import { boardReducer, deleteCardAction, initBoardAction } from './reducer'

export const Board = () => {
  const [board, dispatch] = useImmerReducer(boardReducer, null)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    fetchBoard((initialBoard) => dispatch(initBoardAction(initialBoard)))
  }, [])

  console.log(board)

  if (!board) return null

  return (
    <BoardContext.Provider value={board}>
      <BoardDispatchContext.Provider value={dispatch}>
        <Heading className="">Board</Heading>
        <Divider className="my-4" />
        {board && (
          <UncontrolledBoard
            initialBoard={board}
            onCardDragEnd={(_, card, source, destination) => {
              const from = {
                column_id: source.fromColumnId,
                position: source.fromPosition
              }

              const to = {
                column_id: destination.toColumnId,
                position: destination.toPosition
              }

              moveCard(card, from, to)
            }}
            onColumnDragEnd={(innerBoard) => updateBoard(innerBoard)}
            renderCard={(card, options) => (
              <Card
                card={card}
                options={options}
                selectCard={setSelectedCard}
              />
            )}
            renderColumnHeader={(column, options) => (
              <Column
                column={column}
                onNewCard={(card) => setSelectedCard(card)}
                options={options}
              />
            )}
          />
        )}
        {selectedCard && (
          <EditCard
            isOpen
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onDelete={(cardId) => {
              const callback = (deletedCard) => {
                dispatch(deleteCardAction(deletedCard))
              }

              deleteCard(cardId, callback)
              setSelectedCard(null)
            }}
            onSave={() => null}
          />
        )}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}
