import {
  EllipsisHorizontalIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/16/solid'

import React, { useContext } from 'react'

import { ActionDialog } from '../common/ActionDialog'
import { Badge } from '../ui/badge'

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'
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

  const viewsSelectSection = (
    <div className="flex gap-2 py-4">
      <div className="min-w-64">
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
      <Dropdown>
        <DropdownButton outline>
          <EllipsisHorizontalIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          <DropdownItem onClick={() => setNewColumnDialogOpen(true)}>
            <PlusIcon />
            Create new stage
          </DropdownItem>
          <DropdownItem
            disabled={!columnId}
            onClick={onAddCard}
            {...(!columnId ? { 'data-disabled': 'true' } : {})}
          >
            <PlusIcon />
            Add job to stage
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            disabled={!columnId}
            onClick={() => {
              const col = board.columns.find((c) => c.id === columnId)
              setRemoveColumn(col)
            }}
            {...(!columnId ? { 'data-disabled': 'true' } : {})}
          >
            <TrashIcon className="fill-red-500" />
            Delete stage
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )

  const newColumnDialog = (
    <ActionDialog
      actionButtonColor="blue"
      actionButtonText="Create"
      body={
        <Field>
          <Input
            name="name"
            placeholder="Name of the stage"
            ref={columnNameRef}
          />
        </Field>
      }
      description="Create a new stage to track the progress of your jobs."
      isOpen={newColumnDialogOpen}
      onClose={() => setNewColumnDialogOpen(false)}
      onConfirm={onAddColumn}
      title="New stage"
    />
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
        {viewsSelectSection}
        <Text>No jobs yet.</Text>
        {newColumnDialog}
        {removeColumnDialog}
      </>
    )
  }

  return (
    <>
      {viewsSelectSection}
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
