import {
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  LinkIcon,
  PencilIcon,
  PhoneIcon
} from '@heroicons/react/16/solid'
import { TrashIcon } from '@heroicons/react/20/solid'
import React, { useContext, useState } from 'react'

import { Link } from 'react-router-dom'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { EditCard } from '../board/EditCard'
import { createNote, deleteContact, deleteNote } from '../board/network'
import { ActionDialog } from '../common/ActionDialog'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Divider } from '../ui/divider'

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu
} from '../ui/dropdown'

import { Text } from '../ui/text'

import AddContact from './AddContact'
import EditContact from './EditContact'
import { JobContext } from './JobContext'

const Contact = ({ contact, setEditContact, setRemoveContact }) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2 justify-between">
      <div className="flex gap-2 items-center">
        <Link
          className="text-gray-400"
          href="https://www.linkedin.com/in/jorge-rodriguez-1234567890"
        >
          <LinkIcon className="size-4" />
        </Link>
        <div className="text-gray-600 text-sm font-medium">{contact.name}</div>
        <Badge className="text-xs">{contact.role}</Badge>
      </div>
      <Dropdown>
        <DropdownButton plain>
          <EllipsisHorizontalIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          <DropdownItem onClick={() => setEditContact(contact)}>
            <PencilIcon className="size-4" />
            Edit
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={() => setRemoveContact(contact)}>
            <TrashIcon className="fill-red-500" />
            Remove
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div className="text-sm text-gray-400 flex flex-col gap-2">
      {contact.phone && (
        <a className="flex gap-2 items-center" href={`tel:${contact.phone}`}>
          <PhoneIcon className="size-4" />
          {contact.phone}
        </a>
      )}
      {contact.email && (
        <a className="flex gap-2 items-center" href={`mailto:${contact.email}`}>
          <EnvelopeIcon className="size-4" />
          {contact.email}
        </a>
      )}
    </div>
  </div>
)

const Note = ({ note, removeNote }) => (
  <div className="border rounded-md shadow-md text-zinc-500">
    <div className="flex justify-end py-2 px-2 items-center">
      <div className="text-xs italic">{note.created_at}</div>
      <Button plain onClick={() => removeNote(note)}>
        <TrashIcon className="fill-red-500" />
      </Button>
    </div>
    <div className="text-sm font-medium px-4 pb-4">{note.content}</div>
  </div>
)

export const DetailsTab = () => {
  const { addFlashMessage } = useContext(PubSubContext)
  const { job, setJob } = useContext(JobContext)
  const [editingCard, setEditingCard] = useState(null)
  const [contacts, setContacts] = useState(job?.contacts || [])
  const [notes, setNotes] = useState(job?.notes || [])
  const [newNote, setNewNote] = useState('')
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [removeContact, setRemoveContact] = useState(null)
  const [editContact, setEditContact] = useState(null)
  const [removeNote, setRemoveNote] = useState(null)

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact])
    setIsAddingContact(false)
  }

  const handleRemoveContact = (contact) => {
    deleteContact(contact.id)
    setContacts(contacts.filter((c) => c.id !== contact.id))
    setRemoveContact(null)
    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Contact removed successfully...',
      type: 'toast'
    })
  }

  const handleEditContact = (contact) => {
    setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)))
    setEditContact(null)
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    const note = await createNote(job.id, { content: newNote })
    setNotes([note, ...notes])
    setNewNote('')
    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Note added successfully...',
      type: 'toast'
    })
  }

  const handleRemoveNote = async (jobId, noteId) => {
    deleteNote(jobId, noteId)
    setNotes(notes.filter((n) => n.id !== noteId))
    setRemoveNote(null)
    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Note removed successfully...',
      type: 'toast'
    })
  }

  return (
    <>
      <div className="md:flex flex-row gap-4">
        <div className="basis-2/3 p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex text-sm text-gray-600 items-center gap-2">
              <LinkIcon className="size-4" />
              <a
                className="text-blue-500 hover:underline"
                href={job.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {job.url || 'No posting link available'}
              </a>
            </div>
            <div className="justify-end">
              <Button
                outline
                className="cursor-pointer"
                onClick={() => setEditingCard({ job })}
              >
                <PencilIcon className="size-4" />
                Edit
              </Button>
            </div>
          </div>
          <div className="min-h-56 overflow-scroll">
            <Text>
              {job.description?.split('\n').map(
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
              {contacts.map((contact, index) => (
                <div key={contact.email}>
                  <Contact
                    contact={contact}
                    setEditContact={setEditContact}
                    setRemoveContact={setRemoveContact}
                  />
                  {index < contacts.length - 1 && <Divider className="mt-4" />}
                </div>
              ))}
              <Button
                outline
                className="mt-2"
                onClick={() => setIsAddingContact(true)}
              >
                Add Contact
              </Button>
            </div>
          </div>
          {/* Notes */}
          <div className="text-sm flex flex-col gap-1.5 mt-6">
            {notes.map((note) => (
              <React.Fragment key={note.id}>
                <Note note={note} removeNote={() => setRemoveNote(note)} />
                <div className="h-5 border-l border-gray-300 ml-4" />
              </React.Fragment>
            ))}
            <div className="flex gap-x-3 shadow-md rounded-lg">
              <form
                action="#"
                className="relative flex-auto"
                onSubmit={handleAddNote}
              >
                <div className="overflow-hidden rounded-lg pb-12 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                  <label className="sr-only" htmlFor="comment">
                    Add a note...
                  </label>
                  <textarea
                    className="border-0 focus:border-0 focus:ring-0 block w-full resize-none bg-transparent px-3 py-1.5 text-base placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    id="comment"
                    name="comment"
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    rows={2}
                    value={newNote}
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
      {editingCard && (
        <EditCard
          card={editingCard}
          isOpen={true}
          onClose={() => setEditingCard(null)}
          onSave={(updatedJob) => setJob(updatedJob)}
        />
      )}
      {isAddingContact && (
        <AddContact
          isOpen={isAddingContact}
          jobId={job.id}
          onAddContact={handleAddContact}
          onClose={() => setIsAddingContact(false)}
        />
      )}
      {editContact && (
        <EditContact
          contact={editContact}
          onClose={() => setEditContact(null)}
          onEditContact={handleEditContact}
        />
      )}
      {removeContact && (
        <ActionDialog
          actionButtonColor="red"
          actionButtonText="Delete"
          cancelButtonText="Cancel"
          description="Are you sure you want to delete this contact?"
          isOpen={removeContact !== null}
          onClose={() => setRemoveContact(null)}
          onConfirm={() => handleRemoveContact(removeContact)}
        />
      )}
      {removeNote && (
        <ActionDialog
          actionButtonColor="red"
          actionButtonText="Delete"
          cancelButtonText="Cancel"
          description="Are you sure you want to delete this note?"
          isOpen={removeNote !== null}
          onClose={() => setRemoveNote(null)}
          onConfirm={() => handleRemoveNote(job.id, removeNote.id)}
        />
      )}
    </>
  )
}
