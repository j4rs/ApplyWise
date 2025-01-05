import {
  EllipsisHorizontalIcon,
  PlusIcon,
  TrashIcon,
  ViewColumnsIcon
} from '@heroicons/react/16/solid'
import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle
} from '../ui/dialog'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'
import { Field, Label } from '../ui/fieldset'
import { Heading } from '../ui/heading'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

import { createBoard, deleteBoard, fetchBoards } from './network'

export const Boards = () => {
  const navigate = useNavigate()
  const [boards, setBoards] = useState([])
  const [isOpenCreateBoardDialog, setIsOpenCreateBoardDialog] = useState(false)
  const [boardToRemove, setBoardToRemove] = useState(null)
  const boardForm = useForm()

  const reFetchBoards = async () => setBoards(await fetchBoards())

  React.useEffect(() => {
    reFetchBoards()
  }, [])

  if (!boards.length) return null

  const onSubmitCreateBoard = async (data) => {
    setIsOpenCreateBoardDialog(false)

    const board = await createBoard({ board: data })
    navigate(`/dashboard/boards/${board.id}`)
  }

  const createBoardDialog = () => (
    <Dialog onClose={setIsOpenCreateBoardDialog} open={isOpenCreateBoardDialog}>
      <form onSubmit={boardForm.handleSubmit(onSubmitCreateBoard)}>
        <DialogDescription>
          Create a new board to start tracking your job applications. The board
          will be created with the default columns.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Name your new board"
              {...boardForm.register('name')}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpenCreateBoardDialog(false)}>
            Cancel
          </Button>
          <Button color="blue" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )

  const onRemoveBoard = async () => {
    await deleteBoard(boardToRemove.id)
    reFetchBoards()
    setBoardToRemove(null)
  }

  const removeBoardDialog = () => (
    <Dialog onClose={() => setBoardToRemove(null)} open={!!boardToRemove}>
      <DialogTitle>Delete board</DialogTitle>
      <DialogDescription>
        {`Are you sure you want to delete the board "${boardToRemove?.name}"?`}
      </DialogDescription>
      <DialogActions>
        <Button plain onClick={() => setBoardToRemove(null)}>
          Cancel
        </Button>
        <Button color="red" onClick={onRemoveBoard}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <>
      <div className="flex items-center gap-2 my-4">
        <Heading>Boards</Heading>
        <Button outline onClick={() => setIsOpenCreateBoardDialog(true)}>
          <PlusIcon />
        </Button>
      </div>
      <Table
        striped
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Number of columns</TableHeader>
            <TableHeader>Number of cards</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {boards.map((board) => (
            <TableRow href={`/dashboard/boards/${board.id}`} key={board.id}>
              <TableCell className="font-medium">{board.name}</TableCell>
              <TableCell>{board.columns.length}</TableCell>
              <TableCell>
                {board.columns.reduce(
                  (acc, column) => acc + column.cards.length,
                  0
                )}
              </TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisHorizontalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={`/dashboard/boards/${board.id}`}>
                      <ViewColumnsIcon />
                      View
                    </DropdownItem>
                    <DropdownItem onClick={() => setBoardToRemove(board)}>
                      <TrashIcon className="fill-red-500" />
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {createBoardDialog()}
      {removeBoardDialog()}
    </>
  )
}
