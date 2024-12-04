import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/16/solid'

import React, { useContext, useEffect, useState } from 'react'

import { borderColors, ringColors } from '../../toolsets/colors'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions
} from '../ui/dialog'

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { deleteCard } from './network'
import { deleteCardAction } from './reducer'
import { classNames, findColumn } from './utils'

export const Card = ({ card }) => {
  const board = useContext(BoardContext)
  const { dispatch, setEditCard } = useContext(BoardDispatchContext)
  const [isHovering, setIsHovering] = useState(false)
  const [column, setColumn] = useState(null)

  const [isOpenDialogToRemoveCard, setIsOpenDialogToRemoveCard] =
    useState(false)

  useEffect(() => {
    setColumn(findColumn(board, card.column_id))
  }, [board, card])

  if (!card || column?.collapsed) return null

  const onRemoveCard = async () => {
    const deletedCard = await deleteCard(card.id)
    dispatch(deleteCardAction(deletedCard))
  }

  const removeCardDialog = () => (
    <Dialog
      onClose={setIsOpenDialogToRemoveCard}
      open={isOpenDialogToRemoveCard}
    >
      <DialogTitle>Delete job</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this job?
      </DialogDescription>
      <DialogActions>
        <Button plain onClick={() => setIsOpenDialogToRemoveCard(false)}>
          Cancel
        </Button>
        <Button color="red" onClick={onRemoveCard}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  const {
    job: { id: job_id, company_name, role }
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
          'min-w-64 rounded-lg border p-4 shadow-lg mb-3 ml-0.5 bg-white',
          isHovering && `ring-1 ${ringColors[column?.color]}`
        )}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{role}</p>
            <p className="truncate text-sm text-gray-500">{company_name}</p>
          </div>
          {isHovering && (
            <Dropdown>
              <DropdownButton plain>
                <EllipsisHorizontalIcon />
              </DropdownButton>
              <DropdownMenu anchor="bottom end">
                <DropdownItem href={`jobs/${job_id}`}>
                  <EyeIcon />
                  Open card
                </DropdownItem>
                <DropdownItem onClick={() => setEditCard(card)}>
                  <PencilSquareIcon />
                  Edit job details
                </DropdownItem>
                <DropdownItem onClick={() => setIsOpenDialogToRemoveCard(true)}>
                  <TrashIcon className="fill-red-500" />
                  Delete job
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
      {removeCardDialog()}
    </div>
  )
}
