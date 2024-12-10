import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import React, { useContext } from 'react'

import { Badge } from '../ui/badge'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle
} from '../ui/dialog'
import { Field } from '../ui/fieldset'
import { Input } from '../ui/input'
import { Listbox, ListboxOption } from '../ui/listbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

import { Text } from '../ui/text'

import { BoardDispatchContext } from './BoardContext'
import { CardActions } from './CardsAction'
import { DeleteCardDialog } from './DeleteCardDialog'
import { EditCard } from './EditCard'
import { RemoveColumnDialog } from './RemoveColumnDialog'
import { AddCard } from './actions/AddCard'
import { useDeleteCard } from './hooks/useDeleteCard'
import { useDeleteColumn } from './hooks/useDeleteColumn'
import { createColumn } from './network'
import { createColumnAction } from './reducer'
import { randomColor } from './utils'

export default function CardsList({ board }) {
  const dispatch = useContext(BoardDispatchContext)
  const [cards, setCards] = React.useState([])

  const [editCard, setEditCard] = React.useState(null)
  const [columnId, setColumnId] = React.useState()
  const [newColumnDialogOpen, setNewColumnDialogOpen] = React.useState(false)

  const columnNameRef = React.useRef(null)

  const { onRemoveCard, removeCard, setRemoveCard } = useDeleteCard()
  const { onRemoveColumn, removeColumn, setRemoveColumn } = useDeleteColumn()

  const cardsWithColumn = React.useMemo(
    () =>
      board.columns.flatMap((column) =>
        column.cards.map((card) => ({
          ...card,
          column
        }))
      ),
    [board]
  )

  const recentColumnId = React.useMemo(
    () => board.columns.find((column) => column.recent)?.id,
    [board]
  )

  React.useEffect(() => {
    if (recentColumnId) {
      setColumnId(recentColumnId)
    }
  }, [recentColumnId])

  React.useEffect(() => {
    if (columnId) {
      setCards(cardsWithColumn.filter((card) => card.column.id === columnId))
    } else {
      setCards(cardsWithColumn)
    }
  }, [columnId, cardsWithColumn])

  const onAddCard = () => {
    AddCard(columnId, dispatch)
  }

  const onAddColumn = async () => {
    const column = await createColumn(board.id, {
      column: { color: randomColor(), name: columnNameRef.current.value }
    })
    dispatch(createColumnAction(column))
    setNewColumnDialogOpen(false)
  }

  const viewsSelect = (
    <div className="flex justify-between gap-2 py-4">
      <div className="flex gap-2">
        <div className="w-64">
          <Listbox onChange={setColumnId} value={columnId || null}>
            <ListboxOption key="all" value={null}>
              All stages
            </ListboxOption>
            {board.columns.map((column) => (
              <ListboxOption key={column.id} value={column.id}>
                <Badge color={column.color}>
                  {column.name} ({column.cards.length})
                </Badge>
              </ListboxOption>
            ))}
          </Listbox>
        </div>
        <Button outline onClick={() => setNewColumnDialogOpen(true)}>
          <PlusIcon />
          Add stage
        </Button>
      </div>
      <div className="flex gap-2 justify-end">
        <Button outline disabled={!columnId} onClick={onAddCard}>
          <PlusIcon />
          Add job
        </Button>
        <Button
          outline
          disabled={!columnId}
          onClick={() => {
            const col = board.columns.find((c) => c.id === columnId)
            setRemoveColumn(col)
          }}
        >
          <TrashIcon className="fill-red-500" />
        </Button>
      </div>
    </div>
  )

  const newColumnDialog = (
    <Dialog
      onClose={() => setNewColumnDialogOpen(false)}
      open={newColumnDialogOpen}
    >
      <DialogTitle>New stage</DialogTitle>
      <DialogDescription>
        Create a new stage to track the progress of your jobs.
      </DialogDescription>
      <DialogBody>
        <Field>
          <Input
            name="name"
            placeholder="Name of the stage"
            ref={columnNameRef}
          />
        </Field>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => setNewColumnDialogOpen(false)}>
          Cancel
        </Button>
        <Button onClick={onAddColumn}>Create</Button>
      </DialogActions>
    </Dialog>
  )

  const removeColumnDialog = (
    <RemoveColumnDialog
      isOpen={removeColumn !== null}
      onClose={() => setRemoveColumn(null)}
      onConfirm={() => {
        onRemoveColumn(removeColumn)
        setColumnId(null)
      }}
    />
  )

  if (cards.length === 0) {
    return (
      <>
        {viewsSelect}
        <Text>No jobs yet.</Text>
        {newColumnDialog}
        {removeColumnDialog}
      </>
    )
  }

  return (
    <>
      {viewsSelect}
      <Table
        striped
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Role</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>Stage</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow
              href={`/dashboard/boards/${board.id}/jobs/${card.job.id}/details`}
              key={card.id}
            >
              <TableCell>{card.job.role}</TableCell>
              <TableCell className="text-zinc-500">
                {card.job.company_name || '(no company)'}
              </TableCell>
              <TableCell>
                <Badge color={card.column.color}>{card.column.name}</Badge>
              </TableCell>
              <TableCell>
                <CardActions
                  card={card}
                  setEditCard={setEditCard}
                  setRemoveCard={setRemoveCard}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editCard && (
        <EditCard isOpen card={editCard} onClose={() => setEditCard(null)} />
      )}
      <DeleteCardDialog
        isOpen={removeCard !== null}
        onClose={() => setRemoveCard(null)}
        onConfirm={() => onRemoveCard(removeCard)}
      />
      {newColumnDialog}
      {removeColumnDialog}
    </>
  )
}
