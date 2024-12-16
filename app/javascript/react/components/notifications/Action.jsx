import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

export const Action = (notification, removeNotification) => (
  <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
    <div className="p-4">
      <div className="flex items-start">
        <div className="shrink-0 pt-0.5">
          <img
            alt=""
            className="size-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
          />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {notification.title}
          </p>
          <p className="mt-1 text-sm text-gray-500">{notification.subtitle}</p>
          <div className="mt-4 flex">
            <button
              className="inline-flex items-center rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              type="button"
            >
              Accept
            </button>
            <button
              className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              type="button"
            >
              Decline
            </button>
          </div>
        </div>
        <div className="ml-4 flex shrink-0">
          <button
            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              removeNotification(notification.id)
            }}
            type="button"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
)
