import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState, useRef } from 'react'

export function ComboboxSelect({
  items,
  multiple = false,
  onChange,
  placeholder = 'Select...',
  renderItem,
  selected,
  valueKey = 'value'
}) {
  const [query, setQuery] = useState('')
  const buttonRef = useRef(null)

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )

  const handleChange = (newValue) => {
    onChange(newValue)
    if (!multiple) {
      setQuery('')
      buttonRef.current?.blur()
    }
  }

  const removeItem = (itemToRemove) => {
    const newSelection = selected.filter(
      (item) => item[valueKey] !== itemToRemove[valueKey]
    )
    onChange(newSelection)
  }

  return (
    <div className="relative">
      <Combobox
        as="div"
        multiple={multiple}
        onChange={handleChange}
        value={multiple ? selected : selected?.[valueKey]}
      >
        <div className="relative">
          <ComboboxButton as="div" className="relative w-full" ref={buttonRef}>
            <div className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:text-sm sm:leading-6">
              <div className="flex flex-wrap gap-1">
                {multiple
                  ? selected?.map((item) => (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-sm bg-gray-100 rounded-md"
                        key={item[valueKey]}
                      >
                        {renderItem ? renderItem(item) : item.label}
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
                    ))
                  : selected && (
                      <span className="flex items-center gap-2">
                        {renderItem
                          ? renderItem(
                              items.find((i) => i[valueKey] === selected)
                            )
                          : items.find((i) => i[valueKey] === selected)?.label}
                      </span>
                    )}
                <ComboboxInput
                  className="flex-1 border-0 bg-transparent p-0 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  displayValue={() => ''}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={!selected ? placeholder : ''}
                />
              </div>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center px-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ComboboxButton>
        </div>

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredItems.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredItems.map((item) => (
              <ComboboxOption
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-900'
                  }`
                }
                key={item[valueKey]}
                value={multiple ? item : item[valueKey]}
              >
                {({ active, selectedItem }) => (
                  <>
                    <div className="flex items-center">
                      {renderItem ? renderItem(item) : item.label}
                    </div>

                    {selectedItem && (
                      <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                          active ? 'text-white' : 'text-blue-600'
                        }`}
                      >
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
