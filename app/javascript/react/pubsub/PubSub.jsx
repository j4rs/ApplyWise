import React, { useEffect, useState } from 'react'

import { useActionCable } from '../components/hooks/useActionCable'
import { Flash } from '../components/notifications/Flash'

import { PubSubContext } from './PubSubContext'

export const PubSub = ({ channel, children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    setNotifications([...notifications, notification])
    setTimeout(() => {
      setNotifications([])
    }, 3000)
  }

  const onReceived = (data) => {
    addNotification(data)
  }

  useActionCable({ channel, onReceived })

  return (
    <PubSubContext.Provider value={{ addNotification, notifications }}>
      {children}
      {notifications.map((notification) => (
        <Flash key={notification.id} {...notification} />
      ))}
    </PubSubContext.Provider>
  )
}
