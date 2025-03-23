import React, { useContext } from 'react'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { updateContact } from '../board/network'

import { ContactDialog } from './ContactDialog'

const EditContact = ({ contact, onClose, onEditContact }) => {
  const { addFlashMessage } = useContext(PubSubContext)

  const onSubmit = async (data) => {
    const updatedContact = await updateContact(contact.id, data)
    onEditContact(updatedContact)
    onClose()
    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Contact updated successfully...',
      type: 'toast'
    })
  }

  return (
    <ContactDialog
      contact={contact}
      isOpen={contact !== null}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  )
}
export default EditContact
