import React from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '../ui/button'
import { Dialog, DialogActions } from '../ui/dialog'
import { Field, FieldGroup, Fieldset, Legend, Label } from '../ui/fieldset'

import { Input } from '../ui/input'
import { Text } from '../ui/text'

export const ContactDialog = ({ contact, isOpen, onClose, onSubmit }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: { ...contact }
  })

  return (
    <Dialog className="relative z-10" onClose={onClose} open={isOpen} size="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Legend>Add Contact</Legend>
          <Text>Add a new contact for this job posting.</Text>
          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input
                aria-label="Name"
                name="name"
                {...register('name', { required: true })}
              />
            </Field>

            <Field>
              <Label>Role</Label>
              <Input aria-label="Role" name="role" {...register('role')} />
            </Field>

            <Field>
              <Label>Email</Label>
              <Input
                aria-label="Email"
                name="email"
                {...register('email')}
                type="email"
              />
            </Field>

            <Field>
              <Label>Profile URL</Label>
              <Input
                aria-label="Profile URL"
                name="profile_url"
                placeholder="https://linkedin.com/in/username"
                {...register('profile_url')}
                type="url"
              />
            </Field>

            <Field>
              <Label>Phone</Label>
              <Input
                aria-label="Phone"
                name="phone"
                {...register('phone')}
                type="tel"
              />
            </Field>
          </FieldGroup>
        </Fieldset>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
          <Button color="blue" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
