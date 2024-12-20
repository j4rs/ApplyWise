import { Transition } from '@headlessui/react'
import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { PubSubContext } from '../../pubsub/PubSubContext'

import { Action } from './Action'
import { Click } from './Click'
import { Toast } from './Toast'

export const Flash = () => {
  const { flashMessages, removeFlashMessage } = useContext(PubSubContext)
  const navigate = useNavigate()

  if (!flashMessages) return null

  const notificationComponent = (notification) => {
    switch (notification.type) {
      case 'toast':
        return Toast(notification, removeFlashMessage)
      case 'click':
        return Click(notification, navigate, removeFlashMessage)
      case 'action':
        return Action(notification, removeFlashMessage)
      default:
        return null
    }
  }

  const renderNotification = (notification) => (
    <div
      className="flex w-full flex-col items-center my-4 space-y-4 sm:items-end"
      key={notification.id}
    >
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition show>{notificationComponent(notification)}</Transition>
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
              flashMessages.forEach((message) => removeFlashMessage(message.id))
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
      {flashMessages.length > 0 && (
        <>
          {flashMessages.length > 1 && closeAll}
          {flashMessages.map(renderNotification)}
        </>
      )}
    </div>
  )
}
