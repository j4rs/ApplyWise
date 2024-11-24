import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/16/solid'

import React, { useContext, useEffect, useState } from 'react'

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
import { findColumn } from './utils'

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

  const onRemoveCard = () => {
    deleteCard(card.id, (deletedCard) => {
      dispatch(deleteCardAction(deletedCard))
    })
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
    job: { company_name, role }
  } = card

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-64 rounded-lg border bg-white px-4 py-4 shadow-md hover:border-gray-300 mb-3">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{role}</p>
            <p className="truncate text-sm text-gray-500">{company_name}</p>
          </div>
          {isHovering && (
            <Dropdown>
              <DropdownButton outline>
                <EllipsisHorizontalIcon />
              </DropdownButton>
              <DropdownMenu anchor="bottom end">
                <DropdownItem onClick={() => setEditCard(card)}>
                  <PencilSquareIcon />
                  Edit job details
                </DropdownItem>
                <DropdownItem onClick={() => setIsOpenDialogToRemoveCard(true)}>
                  <TrashIcon />
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
