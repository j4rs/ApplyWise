import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  SparklesIcon,
  TrashIcon
} from '@heroicons/react/16/solid'
import React from 'react'

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'

export const CardActions = ({ card, setEditCard, setRemoveCard }) => (
  <Dropdown>
    <DropdownButton plain>
      <EllipsisHorizontalIcon />
    </DropdownButton>
    <DropdownMenu anchor="bottom end">
      <DropdownItem href={`jobs/${card.job.id}/details`}>
        <SparklesIcon />
        Resume & Cover Letter
      </DropdownItem>
      <DropdownItem onClick={() => setEditCard(card)}>
        <PencilSquareIcon />
        Edit job details
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={() => setRemoveCard(card)}>
        <TrashIcon className="fill-red-500" />
        Delete job
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
)
