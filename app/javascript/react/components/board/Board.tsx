import React, { useEffect, useState } from 'react';
import { Heading } from '../ui/heading';
import { Divider } from '../ui/divider';
import { UncontrolledBoard } from '@caldwell619/react-kanban';
import { Card } from './Card';
import { renderColumnHeader } from './Column';
import { EditCard } from './EditCard';

const updateBoard = (data) => {
  const board = {
    columns: data.columns.map((c, idx) => ({ id: c.id, position: idx }))
  }
  fetch(`/dashboard/board`, {
    method: 'PATCH',
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const Board = () => {
  const [board, setBoard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    fetch('/dashboard/board.json')
      .then(res => res.json())
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
    <>
      <Heading className="">
        Board
      </Heading>
      <Divider className="my-4" />
      {board && (
        <UncontrolledBoard
          initialBoard={board}
          renderColumnHeader={renderColumnHeader}
          renderCard={(card) => <Card card={card} selectCard={setSelectedCard} />}
          onColumnDragEnd={(board) => updateBoard(board)}
          onCardDragEnd={handleCardDragEnd}
        />
      )}
      {selectedCard && (
        <EditCard isOpen card={selectedCard} onSave={() => null} onClose={() => setSelectedCard(null)} />
      )}
    </>
  )
};
