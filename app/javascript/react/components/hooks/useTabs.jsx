import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { classNames } from '../board/utils'
import { Link } from '../ui/link'

export const useTabs = (tabs) => {
  const location = useLocation()
  // Extract the last path segment using regex
  const lastPathSegment = location.pathname.match(/[^/]+$/)?.[0] || ''
  const [activeTab, setActiveTab] = useState(lastPathSegment)

  const tabsUI = (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          defaultValue={tabs.find((tab) => tab.key === activeTab).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                aria-current={tab.key === activeTab ? 'page' : undefined}
                className={classNames(
                  tab.key === activeTab
                    ? 'border-zinc-500 text-zinc-600 font-medium'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm'
                )}
                href={tab.href}
                key={tab.name}
                onClick={() => setActiveTab(tab.key)}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    'size-4',
                    tab.key === activeTab
                      ? 'text-zinc-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 size-5'
                  )}
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )

  return {
    activeTab,
    setActiveTab,
    tabsUI
  }
}
