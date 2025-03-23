import * as Headless from '@headlessui/react'
import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  PlusIcon,
  SwatchIcon,
  TrashIcon
} from '@heroicons/react/16/solid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  bgColorsWithOpacity,
  fillColors,
  columnColors,
  textContrastColors
} from '../../toolsets/colors'
import { sizes } from '../../toolsets/sizes'
import { Button } from '../ui/button'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'

import { BoardContext, BoardDispatchContext } from './BoardContext'
import { EditCard } from './EditCard'
import { RemoveColumnDialog } from './RemoveColumnDialog'
import { AddCard } from './actions/AddCard'
import { useDeleteColumn } from './hooks/useDeleteColumn'
import { updateColumn } from './network'
import { updateColumnAction } from './reducer'
import { classNames } from './utils'

const colorIcon = (color, size = 'md') => (
  <svg
    aria-hidden="true"
    className={`${sizes[size]} ${fillColors[color]}`}
    viewBox="0 0 6 6"
  >
    <circle cx={3} cy={3} r={3} />
  </svg>
)

export const Column = ({ column }) => {
  const board = useContext(BoardContext)
  const dispatch = useContext(BoardDispatchContext)

  const [isEditing, setIsEditing] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const form = useForm()

  const colorDropDownBtn = useRef(null)
  const editContainerRef = useRef(null)

  const { onRemoveColumn, removeColumn, setRemoveColumn } = useDeleteColumn()

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

  const onSubmitColumnName = async (event) => {
    event.preventDefault()
    setIsEditing(false)

    const updatedColumn = await updateColumn(board.id, column.id, {
      column: form.getValues()
    })
    dispatch(updateColumnAction(updatedColumn))
  }

  const onChangeColor = (selectedColor) => async () => {
    const updatedColumn = await updateColumn(board.id, column.id, {
      column: { color: selectedColor }
    })
    dispatch(updateColumnAction(updatedColumn))
  }

  const toggleCollapse = async (isCollapsed) => {
    const updatedColumn = await updateColumn(board.id, column.id, {
      column: { collapsed: isCollapsed }
    })
    dispatch(updateColumnAction(updatedColumn))
  }

  const ColorsDropdown = ({ value = 'light' }) => (
    <Dropdown>
      <Headless.MenuButton
        className="cursor-pointer mx-2 hover:ring-2 hover:rounded-full hover:ring-zinc-950/10 focus:outline-none"
        ref={colorDropDownBtn}
      >
        {colorIcon(value, 'sm')}
      </Headless.MenuButton>
      <DropdownMenu className="!grid-cols-5">
        {Object.keys(fillColors).map((c) => (
          <DropdownItem
            className="data-[focus]:bg-gray-100 !col-span-1"
            key={c}
            onClick={onChangeColor(c)}
          >
            <div
              className={classNames(
                columnColors[c],
                c === color && 'data-[checked]:ring-2',
                'cursor-pointer rounded-full p-0.5 ring-current focus:outline-none'
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

  if (collapsed) {
    return (
      <div
        className={classNames(
          'flex items-center gap-2 py-3 px-1 rounded-lg [writing-mode:vertical-lr]',
          position === 0 ? 'mr-1' : 'mx-1',
          bgColorsWithOpacity[color]
        )}
      >
        <ColorsDropdown value={color} />
        <button onClick={() => toggleCollapse(false)}>
          <div
            className={classNames(
              'flex items-center gap-2 font-semibold',
              textContrastColors[color]
            )}
          >
            <p>
              {name} ({column.cards.length})
            </p>
          </div>
        </button>
      </div>
    )
  }

  const onAddCard = async () => {
    const newCard = await AddCard(column.id, dispatch)
    if (newCard) {
      setEditingCard(newCard)
    }
  }

  return (
    <div className="min-w-64 mr-2">
      <div className="mb-2 flex">
        <div
          className={classNames(
            'flex items-center rounded-lg mr-1',
            bgColorsWithOpacity[color]
          )}
        >
          <ColorsDropdown value={color} />
          {isEditing ? (
            <form onSubmit={onSubmitColumnName} ref={editContainerRef}>
              <div>
                <input
                  type="text"
                  {...form.register('name')}
                  className="p-0 border-0 focus:ring-0 text-base/6 sm:text-sm/6 bg-transparent pr-2"
                />
              </div>
            </form>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <div
                className={classNames(
                  'flex max-w-40 pr-2 items-center gap-2 font-semibold',
                  textContrastColors[color]
                )}
              >
                <p className="truncate">
                  {name} ({column.cards.length})
                </p>
              </div>
            </button>
          )}
        </div>
        <div className="flex grow justify-end">
          <Dropdown>
            <DropdownButton plain>
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
                Edit name
              </DropdownItem>
              <DropdownItem onClick={() => colorDropDownBtn.current?.click()}>
                <SwatchIcon />
                Change color
              </DropdownItem>
              <DropdownItem onClick={onAddCard}>
                <PlusIcon />
                Add a new job
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => setRemoveColumn(column)}>
                <TrashIcon className="fill-red-500" />
                Delete stage
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button plain className="text-zinc-950/50" onClick={onAddCard}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      {/* {column.cards.length === 0 && (
        <Button outline className="text-zinc-950/50 w-full" onClick={onAddCard}>
          <PlusIcon />
          Add new job
        </Button>
      )} */}
      <RemoveColumnDialog
        isOpen={removeColumn !== null}
        onClose={() => setRemoveColumn(null)}
        onConfirm={() => onRemoveColumn(removeColumn)}
      />
      {editingCard && (
        <EditCard
          card={editingCard}
          isOpen={true}
          onClose={() => setEditingCard(null)}
        />
      )}
    </div>
  )
}
