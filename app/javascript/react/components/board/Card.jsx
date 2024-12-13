import React, { useContext, useEffect, useState } from 'react'

import { borderColors, ringColors } from '../../toolsets/colors'

import { Link } from '../ui/link'

import { BoardContext } from './BoardContext'
import { CardActions } from './CardsAction'
import { classNames, findColumn } from './utils'

export const Card = ({ card, setEditCard, setRemoveCard }) => {
  const board = useContext(BoardContext)

  const [isHovering, setIsHovering] = useState(false)
  const [column, setColumn] = useState(null)

  useEffect(() => {
    setColumn(findColumn(board, card.column_id))
  }, [board, card])

  if (!card || column?.collapsed) return null

  const {
    job: { company_name, role }
  } = card

  if (column?.collapsed) return null

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={classNames(
          borderColors[column?.color],
          'w-64 rounded-lg border p-4 shadow-lg mb-3 ml-0.5 bg-white',
          isHovering && `ring-1 ${ringColors[column?.color]}`
        )}
      >
        <div className="flex justify-between">
          <Link className="-m-4" href={`jobs/${card.job.id}/details`}>
            <div className="m-4 w-44">
              <p className="truncate text-sm font-medium text-zinc-700">
                {role}
              </p>
              <p className="truncate text-sm text-zinc-500">{company_name}</p>
            </div>
          </Link>
          {isHovering && (
            <CardActions
              card={card}
              setEditCard={setEditCard}
              setRemoveCard={setRemoveCard}
            />
          )}
        </div>
      </div>
    </div>
  )
}
