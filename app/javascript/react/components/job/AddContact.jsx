import React, { useContext } from 'react'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { createContact } from '../board/network'

import { ContactDialog } from './ContactDialog'

const AddContact = ({ isOpen, jobId, onAddContact, onClose }) => {
  const { addFlashMessage } = useContext(PubSubContext)

  const onSubmit = async (data) => {
    const newContact = await createContact(jobId, data)
    onAddContact(newContact)
    onClose()
    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Contact added successfully...',
      type: 'toast'
    })
  }

  return <ContactDialog isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
}
export default AddContact
