import React, { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'

import { useActionCable } from '../components/hooks/useActionCable'

import { PubSubContext } from './PubSubContext'

export const PubSub = ({ channel, children }) => {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const addNotification = useCallback((notification) => {
    const id = uuid()
    setNotifications((prev) => [{ ...notification, id }, ...prev])

    if (notification.duration) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((msg) => msg.id !== id))
      }, notification.duration)
    }
  }, [])

  const onReceived = useCallback(
    (data) => {
      addNotification(data)
    },
    [addNotification]
  )

  useActionCable({ channel, onReceived })

  return (
    <PubSubContext.Provider
      value={{ addNotification, notifications, removeNotification }}
    >
      {children}
    </PubSubContext.Provider>
  )
}
