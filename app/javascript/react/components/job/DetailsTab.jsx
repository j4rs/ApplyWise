import {
  EnvelopeIcon,
  LinkIcon,
  PencilIcon,
  PhoneIcon
} from '@heroicons/react/16/solid'
import { m } from 'framer-motion'
import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import { Text } from '../ui/text'

import { JobContext } from './JobContext'

const CONTACTS = [
  {
    color: 'blue',
    email: 'jorge@gmail.com',
    name: 'Jorge Rodriguez',
    phone: '+58 412 123 4567',
    role: 'Recruiter'
  },
  {
    color: 'red',
    email: 'doe@gmail.com',
    name: 'John Doe',
    phone: '+58 123 456 7890',
    role: 'Engineering Manager'
  }
]

const NOTES = [
  {
    date: '2 days ago',
    text: 'This is the first note. It is a long note that should be displayed in multiple lines.'
  },
  {
    date: '4 days ago',
    text: 'This the second note, it is a short note.'
  }
]

const Contact = ({ contact }) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2 items-center">
      <Link
        className="text-gray-400"
        href="https://www.linkedin.com/in/jorge-rodriguez-1234567890"
      >
        <LinkIcon className="size-4" />
      </Link>
      <div className="text-gray-600 text-sm font-medium">{contact.name}</div>
      <Badge className="text-xs" color={contact.color}>
        {contact.role}
      </Badge>
    </div>
    <div className="text-sm text-gray-400 flex flex-col gap-2">
      <a className="flex gap-2 items-center" href={`tel:${contact.phone}`}>
        <PhoneIcon className="size-4" />
        {contact.phone}
      </a>
      <a className="flex gap-2 items-center" href={`mailto:${contact.email}`}>
        <EnvelopeIcon className="size-4" />
        {contact.email}
      </a>
    </div>
  </div>
)

const Note = ({ note }) => (
  <div className="border rounded-md shadow-md text-zinc-500">
    <div className="text-xs p-2 flex justify-end italic">{note.date}</div>
    <div className="text-sm font-medium px-2 pb-4">{note.text}</div>
  </div>
)

export const DetailsTab = () => {
  const job = useContext(JobContext)

  return (
    <div className="md:flex flex-row gap-4">
      <div className="basis-2/3 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Description</span>
          <Button plain className="cursor-pointer">
            <PencilIcon className="size-4" />
          </Button>
        </div>
        <Divider />
        <div className="min-h-56 overflow-scroll">
          <Text>
            {job.description.split('\n').map(
              (line, index) =>
                line.length > 0 && (
                  <span className="block mb-4" key={index}>
                    {line}
                  </span>
                )
            )}
          </Text>
        </div>
      </div>
      <div className="basis-1/3 flex flex-col gap-6">
        {/* Contacts */}
        <div className="border rounded-md shadow-md p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {CONTACTS.map((contact, index) => (
              <div key={contact.email}>
                <Contact contact={contact} />
                {index < CONTACTS.length - 1 && <Divider className="mt-4" />}
              </div>
            ))}
            <Button outline className="mt-2">
              Add Contact
            </Button>
          </div>
        </div>
        {/* Notes */}
        <div className="text-sm flex flex-col gap-1.5 mt-6">
          {NOTES.map((note) => (
            <>
              <Note key={note.date} note={note} />
              <div className="h-5 border-l border-gray-300 ml-4" />
            </>
          ))}
          <div className="flex gap-x-3 shadow-md">
            <form action="#" className="relative flex-auto">
              <div className="overflow-hidden rounded-lg pb-12 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                <label className="sr-only" htmlFor="comment">
                  Add a note...
                </label>
                <textarea
                  className="border-0 focus:border-0 focus:ring-0 block w-full resize-none bg-transparent px-3 py-1.5 text-base placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  id="comment"
                  name="comment"
                  placeholder="Add a note..."
                  rows={2}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                <Button outline type="submit">
                  Add Note
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
