import { v4 as uuid } from 'uuid'

import React from 'react'
import { Text } from '../ui/text'
import { PlusIcon } from '@heroicons/react/16/solid'

const fillColors = {
  blue: "fill-blue-500",
  green: "fill-green-500",
  orange: "fill-orange-500",
  purple: "fill-purple-500",
  red: "fill-red-500",
  yellow: "fill-yellow-500"
}

const textColors = {
  blue: "text-blue-500",
  green: "text-green-500",
  orange: "text-orange-500",
  purple: "text-purple-500",
  red: "text-red-500",
  yellow: "text-yellow-500"
}

const bgColors = {
  blue: "bg-blue-400/10",
  green: "bg-green-400/10",
  orange: "bg-orange-400/10",
  purple: "bg-purple-400/10",
  red: "bg-red-400/10",
  yellow: "bg-yellow-400/10"
}

export const Column = ({ column, onAddCard }) => {
  const { color, name } = column
  return (
    <div className="mb-2 min-w-72 flex justify-between">
      <div className="flex items-center">
        {/* <div className={`flex-none rounded-full p-1 ${textColors[color]} ${bgColors[color]}`}>
          <div className={`size-2 rounded-full bg-current`}></div>
        </div> */}
        <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-1.5 ${fillColors[color]}`}>
          <circle r={3} cx={3} cy={3} />
        </svg>
        <Text color={color} className="font-semibold mx-2">{name}</Text>
      </div>
      <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 mx-6" onClick={onAddCard}>
        <PlusIcon aria-hidden="true" className="size-5"/>
      </button>
    </div>
  )
}

const createCard = (board_column_id, card) => {
  fetch('/dashboard/board/cards', {
    method: 'POST',
    body: JSON.stringify({board_column_id, card}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const renderColumnHeader = (column, { addCard }) => {
  const onAddCard = () => {
    const id = uuid()
    const card = {
      id,
      job: {
        role: "Edit role",
        company_name: "Edit company name"
      }
    }
    createCard(column.id, { job_attributes: card.job, slug: id })
    addCard(card, { on: "top" })
  }

  return <Column column={column} onAddCard={onAddCard} />
}
