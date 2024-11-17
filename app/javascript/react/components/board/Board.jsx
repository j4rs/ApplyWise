import { UncontrolledBoard } from '@caldwell619/react-kanban'
import React, { useEffect, useState } from 'react'

import { Divider } from '../ui/divider'
import { Heading } from '../ui/heading'

import { Card } from './Card'
import { renderColumnHeader } from './Column'
import { EditCard } from './EditCard'

const updateBoard = (data) => {
  const board = {
    columns: data.columns.map((c, idx) => ({ id: c.id, position: idx }))
  }
  fetch(`/dashboard/board`, {
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })
}

export const Board = () => {
  const [board, setBoard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    fetch('/dashboard/board.json')
      .then((res) => res.json())
      .then(setBoard)
  }, [])

  console.log(board)

  const handleColumnDragEnd = (board) => {
    console.log(board)
  }

  const handleCardDragEnd = (subject, source, dest) => {
    console.log(subject, source, dest)
  }

  console.log(selectedCard !== null)

  return (
    <React.Fragment>
      <Heading className="">Board</Heading>
      <Divider className="my-4" />
      {board && (
        <UncontrolledBoard
          initialBoard={board}
          onCardDragEnd={handleCardDragEnd}
          onColumnDragEnd={() => updateBoard(board)}
          renderCard={(card) => (
            <Card card={card} selectCard={setSelectedCard} />
          )}
          renderColumnHeader={renderColumnHeader}
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
    </React.Fragment>
  )
}
