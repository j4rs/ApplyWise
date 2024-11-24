import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/16/solid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle
} from '../ui/dialog'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'
import { Text } from '../ui/text'

import { BoardDispatchContext } from './BoardContext'
import { createCard, deleteColumn, updateColumn } from './network'
import {
  addCardAction,
  deleteColumnAction,
  updateColumnAction
} from './reducer'
import { classNames } from './utils'

const textColors = {
  blue: 'text-blue-500',
  cyan: 'text-cyan-500',
  emerald: 'text-emerald-500',
  green: 'text-green-500',
  light: 'text-zinc-300',
  orange: 'text-orange-500',
  purple: 'text-purple-500',
  red: 'text-red-500',
  sky: 'text-sky-500',
  teal: 'text-teal-500',
  violet: 'text-violet-500',
  yellow: 'text-yellow-500',
  zinc: 'text-zinc-500'
}

// const bgColors = {
//   blue: 'bg-blue-500',
//   cyan: 'bg-cyan-500',
//   emerald: 'bg-emerald-400',
//   green: 'bg-green-500',
//   light: 'bg-zinc-300',
//   orange: 'bg-orange-500',
//   purple: 'bg-purple-500',
//   red: 'bg-red-500',
//   sky: 'bg-sky-500',
//   teal: 'bg-teal-500',
//   violet: 'bg-violet-500',
//   yellow: 'bg-yellow-500',
//   zinc: 'bg-zinc-300'
// }

const fillColors = {
  blue: 'fill-blue-500',
  cyan: 'fill-cyan-500',
  emerald: 'fill-emerald-400',
  green: 'fill-green-500',
  light: 'fill-zinc-300',
  orange: 'fill-orange-500',
  purple: 'fill-purple-500',
  red: 'fill-red-500',
  sky: 'fill-sky-500',
  teal: 'fill-teal-500',
  violet: 'fill-violet-500',
  yellow: 'fill-yellow-500',
  zinc: 'fill-zinc-500'
}

const sizes = {
  lg: 'size-5',
  md: 'size-4',
  sm: 'size-3',
  xs: 'size-2'
}

const colorIcon = (color, size = 'md') => (
  <svg
    aria-hidden="true"
    className={`${sizes[size]} ${fillColors[color]}`}
    viewBox="0 0 6 6"
  >
    <circle cx={3} cy={3} r={3} />
  </svg>
)

export const Column = ({ column, onNewCard = () => null }) => {
  const { dispatch } = useContext(BoardDispatchContext)

  const [isEditing, setIsEditing] = useState(false)
  const form = useForm()

  const [isOpenDialogToRemoveColumn, setIsOpenDialogToRemoveColumn] =
    useState(false)

  const editContainerRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target)
      ) {
        setIsEditing(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isEditing) {
      form.setFocus('name')
    }
  }, [isEditing])

  useEffect(() => {
    form.register('name', { value: column.name })
  }, [form, column])

  if (!column) return null

  const { collapsed, color, name, position } = column

  const onAddCard = () => {
    const id = uuid()
    const card = {
      id,
      job: {
        company_name: 'Edit company name',
        role: 'Edit role'
      }
    }

    createCard(
      column.id,
      { job_attributes: card.job, slug: id },
      (createdCard) => {
        dispatch(addCardAction(column.id, createdCard))
        // addCard(createdCard, { on: 'top' })
        onNewCard(createdCard)
      }
    )
  }

  const onSubmitColumnName = (event) => {
    event.preventDefault()
    setIsEditing(false)

    const payload = { column: form.getValues() }

    updateColumn(column.id, payload, (updatedColumn) => {
      dispatch(updateColumnAction(updatedColumn))
      // renameColumn(updatedColumn.name)
    })
  }

  const onChangeColor = (selectedColor) => () => {
    updateColumn(
      column.id,
      {
        column: { color: selectedColor }
      },
      (updatedColumn) => {
        dispatch(updateColumnAction(updatedColumn))
      }
    )
  }

  const toggleCollapse = (isCollapsed) => {
    updateColumn(
      column.id,
      { column: { collapsed: isCollapsed } },
      (updatedColumn) => {
        dispatch(updateColumnAction(updatedColumn))
      }
    )
  }

  const onRemoveColumn = () => {
    deleteColumn(column.id, () => {
      dispatch(deleteColumnAction(column.id))
    })
  }

  const ColorsDropdown = ({ value = 'light' }) => (
    <Dropdown>
      <DropdownButton outline className="cursor-pointer border-0">
        {colorIcon(value, 'sm')}
      </DropdownButton>
      <DropdownMenu>
        {Object.keys(fillColors).map((c) => (
          <DropdownItem
            className="data-[focus]:bg-gray-100"
            key={c}
            onClick={onChangeColor(c)}
          >
            <div
              className={classNames(
                textColors[c],
                c === color && 'data-[checked]:ring-2',
                'grid-cols-subgrid col-span-10 -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-current focus:outline-none'
              )}
              data-checked={c === value}
            >
              <div
                aria-hidden="true"
                className="size-8 rounded-full border border-black/10 bg-current"
              >
                {c === color && <CheckIcon color="white" />}
              </div>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )

  const removeColumnDialog = () => (
    <Dialog
      onClose={setIsOpenDialogToRemoveColumn}
      open={isOpenDialogToRemoveColumn}
    >
      <DialogTitle>Delete column</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this column?
      </DialogDescription>
      <DialogActions>
        <Button plain onClick={() => setIsOpenDialogToRemoveColumn(false)}>
          Cancel
        </Button>
        <Button color="red" onClick={onRemoveColumn}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  if (collapsed) {
    return (
      <div className={`${position === 0 ? 'ml-0 mr-4' : 'mx-4'} gap-4 py-1.5`}>
        <div className="flex items-center">
          <ColorsDropdown value={color} />
          <button className="gap-2" onClick={() => toggleCollapse(false)}>
            <ChevronDoubleRightIcon className="size-5 text-gray-300 hover:text-gray-500" />
          </button>
        </div>
        <div className="[writing-mode:vertical-lr]">
          <button onClick={() => toggleCollapse(false)}>
            <Text className="font-semibold">{name}</Text>
          </button>
          <button className="my-2" onClick={() => toggleCollapse(false)}>
            <Badge className="px-0 py-2" color={color}>
              {column.cards.length}
            </Badge>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-64 mr-2">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <ColorsDropdown value={color} />
          {isEditing ? (
            <form onSubmit={onSubmitColumnName} ref={editContainerRef}>
              <div>
                <input
                  type="text"
                  {...form.register('name')}
                  className="border-0 text-gray-900 focus:ring-0 sm:text-sm/6 p-0 mx-2"
                />
                <div
                  aria-hidden="true"
                  className="inset-x-0 bottom-0 border-t border-gray-300 mx-2"
                />
              </div>
            </form>
          ) : (
            <div className="max-w-44">
              <Text
                className="font-semibold mx-2 truncate"
                color={color}
                onClick={() => setIsEditing(true)}
              >
                {name}
              </Text>
            </div>
          )}
        </div>
        <Dropdown>
          <DropdownButton outline>
            <EllipsisHorizontalIcon />
          </DropdownButton>
          <DropdownMenu anchor="bottom end">
            <DropdownItem onClick={() => toggleCollapse(true)}>
              <ChevronDoubleLeftIcon
                aria-hidden="true"
                className="size-5 text-gray-300 hover:text-gray-500"
              />
              Collapse
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => setIsEditing(true)}>
              <PencilSquareIcon />
              Edit column name
            </DropdownItem>
            <DropdownItem onClick={onAddCard}>
              <PlusIcon />
              Add new job
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => setIsOpenDialogToRemoveColumn(true)}>
              <TrashIcon />
              Delete column
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {column.cards.length === 0 && (
        <Button
          plain
          className="text-gray-200 hover:text-gray-500"
          onClick={onAddCard}
        >
          Create a new job...
        </Button>
      )}
      {removeColumnDialog()}
    </div>
  )
}
