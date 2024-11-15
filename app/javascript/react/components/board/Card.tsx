import React, { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/16/solid'

export const Card = ({ card, selectCard }) => {
  const { content: { role, company_name, url, color }} = card
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="w-64 relative flex space-x-3 rounded-lg border bg-white px-4 py-4 shadow-md hover:border-gray-300 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{role}</p>
          <p className="truncate text-sm text-gray-500">{company_name}</p>
        </div>
        {isHovering && (
          <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100 mx-6" onClick={() => selectCard(card)}>
            <PencilSquareIcon aria-hidden="true" className="size-5"/>
          </button>
        )}
      </div>
    </div>
  )
}
