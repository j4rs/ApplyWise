import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'

import { PubSubContext } from '../../pubsub/PubSubContext'

export const Flash = () => {
  const { notifications, removeNotification } = useContext(PubSubContext)

  if (!notifications) return null

  const renderNotification = (notification) => (
    <div
      className="flex w-full flex-col items-center my-4 space-y-4 sm:items-end"
      key={notification.id}
    >
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition show>
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
          <div className="p-4">
            <div className="flex items-start">
              <div className="shrink-0">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="size-6 text-green-400"
                />
              </div>
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
      </Transition>
    </div>
  )

  const closeAll = (
    <div
      className="flex w-full flex-col items-center my-4 space-y-4 sm:items-end"
      key="close-all"
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden ">
        <div className="flex w-full flex-col items-center sm:items-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              notifications.forEach((notification) =>
                removeNotification(notification.id)
              )
            }}
            type="button"
          >
            <span className="inline-flex items-center px-2 py-0.5 text-sm bg-gray-100 rounded-md cursor-pointer">
              <span className="sr-only">Close all notifications</span>
              close all
            </span>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 px-4 py-6 sm:items-start sm:p-6"
    >
      {notifications.length > 0 && (
        <>
          {notifications.length > 1 && closeAll}
          {notifications.map(renderNotification)}
        </>
      )}
    </div>
  )
}
