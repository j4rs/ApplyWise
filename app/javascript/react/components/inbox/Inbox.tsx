import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../ui/dropdown'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

export const Inbox = () => {
  const users = [{
    name: 'John Doe',
    handle: 'john.doe',
    email: 'john.doe@example.com',
    access: 'Admin'
  }, {
    name: 'Jane Doe',
    handle: 'jane.doe',
    email: 'jane.doe@example.com',
    access: 'User'
  }]

  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
    <TableHead>
      <TableRow>
        <TableHeader>Name</TableHeader>
        <TableHeader>Email</TableHeader>
        <TableHeader>Access</TableHeader>
        <TableHeader className="relative w-0">
          <span className="sr-only">Actions</span>
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.handle}>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell className="text-zinc-500">{user.access}</TableCell>
          <TableCell>
            <div className="-mx-3 -my-1.5 sm:-mx-2.5">
              <Dropdown>
                <DropdownButton plain aria-label="More options">
                  <EllipsisHorizontalIcon />
                </DropdownButton>
                <DropdownMenu anchor="bottom end">
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}
