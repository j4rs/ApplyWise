import { UncontrolledBoard } from '@caldwell619/react-kanban'
import React, { useEffect, useState } from 'react'

import { useImmerReducer } from 'use-immer'

import { Divider } from '../ui/divider'
import { Heading } from '../ui/heading'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { Card } from './Card'
import { Column } from './Column'
import { EditCard } from './EditCard'
import { fetchBoard, updateBoard } from './network'
import { boardReducer, initBoardAction } from './reducer'

export const Board = () => {
  const [board, dispatch] = useImmerReducer(boardReducer, null)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    fetchBoard((initialBoard) => dispatch(initBoardAction(initialBoard)))
  }, [])

  const handleCardDragEnd = (subject, source, dest) => {
    console.log(subject, source, dest)
  }

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
            onCardDragEnd={handleCardDragEnd}
            onColumnDragEnd={(innerBoard) => updateBoard(innerBoard)}
            renderCard={(card) => (
              <Card card={card} selectCard={setSelectedCard} />
            )}
            renderColumnHeader={(column, options) => (
              <Column column={column} options={options} />
            )}
          />
        )}
        {selectedCard && (
          <EditCard
            isOpen
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onSave={() => null}
          />
        )}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}
