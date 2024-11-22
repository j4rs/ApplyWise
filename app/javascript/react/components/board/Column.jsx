import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/16/solid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { Badge, BadgeButton } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Dropdown,
  DropdownButton,
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

const colorIcon = (color, size = 4) => (
  <svg
    aria-hidden="true"
    className={`size-${size} ${fillColors[color]}`}
    viewBox="0 0 6 6"
  >
    <circle cx={3} cy={3} r={3} />
  </svg>
)

export const Column = ({ column, onNewCard }) => {
  const { dispatch } = useContext(BoardDispatchContext)

  const [isEditing, setIsEditing] = useState(false)
  const form = useForm()

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

  const { collapsed, color, name } = column

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
    if (window.confirm('Are you sure you want to delete this column?')) {
      deleteColumn(column.id, () => {
        dispatch(deleteColumnAction(column.id))
      })
    }
  }

  const ColorsDropdown = ({ value = 'light' }) => (
    <div>
      <Dropdown>
        <DropdownButton outline className="cursor-pointer border-0">
          {colorIcon(value, 3)}
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
    </div>
  )

  if (collapsed) {
    return (
      <div>
        <div className="flex">
          <ColorsDropdown value={color} />
          <button
            className="flex items-center gap-2"
            onClick={() => toggleCollapse(false)}
          >
            <ChevronDoubleRightIcon className="size-5 text-gray-300 hover:text-gray-500" />
          </button>
        </div>
        <div className="flex m-1 gap-2 [writing-mode:vertical-lr]">
          <button onClick={() => toggleCollapse(false)}>
            <Text className="font-semibold min-w-full">{name}</Text>
          </button>
          <button onClick={() => toggleCollapse(false)}>
            <Badge className="px-0 py-2" color={color}>
              {column.cards.length} cards
            </Badge>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="gap-4">
      <div className="mb-2 w-72 flex justify-between">
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
            <div>
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
        <div className="flex flex-row gap-2">
          <button onClick={() => toggleCollapse(true)}>
            <ChevronDoubleLeftIcon
              aria-hidden="true"
              className="size-5 text-gray-300 hover:text-gray-500"
            />
          </button>
          <button onClick={onRemoveColumn}>
            <TrashIcon
              aria-hidden="true"
              className="size-5 rounded-full hover:bg-red-100 text-red-100 hover:text-red-400"
            />
          </button>
          <button onClick={onAddCard}>
            <PlusIcon
              aria-hidden="true"
              className="size-5 mr-8 rounded-full hover:bg-gray-100 text-gray-300 hover:text-gray-500"
            />
          </button>
        </div>
      </div>
      {column.cards.length === 0 && (
        <Button
          plain
          className="text-gray-400 hover:text-gray-500"
          onClick={onAddCard}
        >
          Create a new card...
        </Button>
      )}
    </div>
  )
}
