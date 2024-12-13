import { createConsumer } from '@rails/actioncable'
import { useEffect, useRef } from 'react'

export const useActionCable = ({ channel, onReceived }) => {
  const subscription = useRef(null)
  const consumer = useRef(createConsumer())

  useEffect(() => {
    console.log('⭐️ Setting up subscription')

    subscription.current = consumer.current.subscriptions.create(
      { channel },
      {
        connected() {
          console.log(`⭐️ Connected to ${channel}`)
        },
        disconnected() {
          console.log(`⭐️ Disconnected from ${channel}`)
        },
        received(data) {
          console.log('⭐️ Received:', data)
          onReceived?.(data)
        }
      }
    )

    return () => {
      console.log('⭐️ Cleaning up subscription')
      if (subscription.current) {
        subscription.current.unsubscribe()
        subscription.current = null
      }
    }
  }, [channel, onReceived])

  return subscription.current
}
