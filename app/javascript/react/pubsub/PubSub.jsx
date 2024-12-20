import React, { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'

import { useActionCable } from '../components/hooks/useActionCable'

import { PubSubContext } from './PubSubContext'

export const PubSub = ({ children }) => {
  const [flashMessages, setFlashMessages] = useState([])
  const [inboxNotifications, setInboxNotifications] = useState([])

  const removeFlashMessage = useCallback((id) => {
    setFlashMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const addFlashMessage = useCallback((message) => {
    const id = uuid()
    setFlashMessages((prev) => [{ ...message, id }, ...prev])

    if (message.duration) {
      setTimeout(() => {
        setFlashMessages((prev) => prev.filter((msg) => msg.id !== id))
      }, message.duration)
    }
  }, [])

  const onReceivedFlashMessage = useCallback(
    (data) => {
      addFlashMessage(data)
    },
    [addFlashMessage]
  )

  const onReceivingNotification = useCallback(
    (data) => {
      addFlashMessage({
        duration: 3000,
        icon: 'info',
        title: 'There are new notifications...',
        type: 'toast'
      })
      setInboxNotifications((prev) => [...prev, data])
    },
    [setInboxNotifications]
  )

  useActionCable({
    channel: 'FlashChannel',
    onReceived: onReceivedFlashMessage
  })

  useActionCable({
    channel: 'NotificationChannel',
    onReceived: onReceivingNotification
  })

  return (
    <PubSubContext.Provider
      value={{
        addFlashMessage,
        flashMessages,
        inboxNotifications,
        removeFlashMessage,
        setInboxNotifications
      }}
    >
      {children}
    </PubSubContext.Provider>
  )
}
