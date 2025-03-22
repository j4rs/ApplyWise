import { ArrowPathIcon, ChevronDownIcon, EyeIcon, TrashIcon } from '@heroicons/react/20/solid'
import React, { useContext, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { fetchNotifications } from '../board/network'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Divider } from '../ui/divider'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'
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
    <div
      className="py-4 cursor-pointer hover:bg-gray-100/50 hover:rounded-md text-sm"
      key={notification.id}
    >
      <div className="flex flex-row gap-2 align-top">
        <Checkbox
          aria-label="read notification"
          className="grow-0"
          color="blue"
          name="read_notification"
        />
        <div className="grow flex flex-col gap-2">
          <div className="-mt-1">{notification.subject}</div>
          <div>{notification.body}</div>
        </div>
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

  const states = (
    <div className="text-sm mt-4 flex flex-row gap-2">
      <div className="flex flex-row gap-2">
        <div className="rounded-md bg-blue-500 px-2 py-1">
          <div className="text-blue-100">All</div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="rounded-md py-1">
          <div>New</div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="rounded-md py-1">
          <div>Read</div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {header}
      {states}
      <div className="flex flex-row gap-2 items-center mt-4">
        <Checkbox aria-label="Select all" color="blue" name="select_all" />
        <Dropdown>
          <DropdownButton outline aria-label="More options">
            Actions
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu anchor="bottom end">
            <DropdownItem plain onClick={() => {}}>
              <EyeIcon />
              Mark as read
            </DropdownItem>
            <DropdownItem onClick={() => {}}>
              <TrashIcon className="fill-red-500" />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Divider className="mt-4" />
      <div className="mt-4 flex flex-col gap-4">
        {data.notifications.map((notification) =>
          renderNotification(notification)
        )}
      </div>
      {pagination}
    </div>
  )
}
