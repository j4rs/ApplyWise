import React, { useState } from 'react'

import { useActionCable } from './react/components/hooks/useActionCable'
import { Flash } from './react/components/notifications/Flash'

export const PubSub = ({ channel, children }) => {
  const [notifications, setNotifications] = useState([])

  const onReceived = (data) => {
    setNotifications([data])
    setTimeout(() => {
      setNotifications([])
    }, 5000)
  }

  useActionCable({ channel, onReceived })

  return (
    <>
      {children}
      {notifications.map((notification) => (
        <Flash key={notification.id} {...notification} />
      ))}
    </>
  )
}
