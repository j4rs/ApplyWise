import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

const defaultRenderItem = (item) => item?.label

export function ComboBoxSelect({
  className,
  defaultValue,
  items = [],
  multiple = false,
  onChange,
  placeholder = 'Search...',
  renderItem = defaultRenderItem,
  value
}) {
  const [query, setQuery] = useState('')

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )

  const removeItem = (item) => {
    onChange(value.filter((v) => v.value !== item.value))
  }

  if (items.length === 0) return null

  return (
    <div className={className}>
      <Combobox
        as="div"
        defaultValue={defaultValue}
        multiple={multiple}
        onChange={onChange}
        value={value}
      >
        <div className="relative mt-2">
          <ComboboxInput
            className="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
            displayValue={(item) => item?.label}
            onBlur={() => setQuery('')}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="size-5 text-gray-400"
            />
          </ComboboxButton>

          {filteredItems.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredItems.map((item) => (
                <ComboboxOption
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-none"
                  key={item.value}
                  value={item}
                >
                  {renderItem(item)}
                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-blue-500 group-data-[selected]:flex group-data-[focus]:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      {multiple && value?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-sm bg-gray-100 rounded-md"
              key={item.value}
            >
              {renderItem(item)}
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeItem(item)
                }}
                type="button"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
