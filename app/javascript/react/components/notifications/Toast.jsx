import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/20/solid'
import React from 'react'

export const Toast = (notification, removeNotification) => {
  let icon = null

  switch (notification.icon) {
    case 'success':
      icon = <CheckCircleIcon className="size-6 text-green-500" />
      break
    case 'error':
      icon = <ExclamationCircleIcon className="size-6 text-red-500" />
      break
    case 'info':
      icon = <InformationCircleIcon className="size-6 text-blue-500" />
      break
    default:
      break
  }

  return (
    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
      <div className="p-4">
        <div className="flex items-start">
          <div className="shrink-0">{icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            {notification.subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {notification.subtitle}
              </p>
            )}
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
}
