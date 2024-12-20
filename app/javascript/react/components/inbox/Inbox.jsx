import { ArrowPathIcon } from '@heroicons/react/20/solid'
import React, { useContext, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { fetchNotifications } from '../board/network'
import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import { Heading } from '../ui/heading'

import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious
} from '../ui/pagination'
import { Text } from '../ui/text'

const DEFAULT_PER_PAGE = 3

export const Inbox = () => {
  const { setInboxNotifications } = useContext(PubSubContext)
  const [data, setData] = useState({ notifications: [] })
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page') || 1
  const currentPage = parseInt(page, 10)
  const pageCount = Math.ceil(data.total_count / DEFAULT_PER_PAGE)

  const refreshNotifications = () => {
    fetchNotifications(currentPage, DEFAULT_PER_PAGE).then(setData)
    setInboxNotifications([])
  }

  useEffect(() => {
    refreshNotifications()
  }, [page])

  const renderNotification = (notification) => (
    <div className="shadow-md p-4 rounded-md" key={notification.id}>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{notification.subject}</span>
        <span className="text-sm text-zinc-500">{notification.body}</span>
      </div>
    </div>
  )

  const header = (
    <>
      <div className="flex justify-between items-center">
        <Heading>Notifications Inbox</Heading>
        <Button outline href={`?page=${1}`}>
          <ArrowPathIcon className="size-4" />
        </Button>
      </div>
      <Text>
        Notifications are sent to your email. You can also view them here.
      </Text>
      <Divider className="mt-4" />
    </>
  )

  if (data.notifications.length === 0) {
    return (
      <>
        {header}
        <Text className="mt-4">No notifications yet.</Text>
      </>
    )
  }

  const pagination = (
    <Pagination className="mt-8">
      <PaginationPrevious
        {...(currentPage > 1 && { href: `?page=${currentPage - 1}` })}
      />
      <PaginationList>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <PaginationPage
            current={p === currentPage ? p : null}
            href={`?page=${p}`}
            key={p}
          >
            {p}
          </PaginationPage>
        ))}
      </PaginationList>
      <PaginationNext
        {...(currentPage < pageCount && { href: `?page=${currentPage + 1}` })}
      />
    </Pagination>
  )

  return (
    <div>
      {header}
      <div className="mt-4 flex flex-col gap-4">
        {data.notifications.map((notification) =>
          renderNotification(notification)
        )}
      </div>
      {pagination}
    </div>
  )
}
