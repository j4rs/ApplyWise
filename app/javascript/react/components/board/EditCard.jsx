import { LinkIcon } from '@heroicons/react/16/solid'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { JobEditor } from '../jobs/JobEditor'
import { Button } from '../ui/button'
import { Dialog, DialogActions } from '../ui/dialog'

import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend
} from '../ui/fieldset'
import { Input, InputGroup } from '../ui/input'
import { Text } from '../ui/text'

import { BoardDispatchContext } from './BoardContext'

import { updateJob } from './network'
import { updateCardAction } from './reducer'

export const EditCard = (props) => {
  const { dispatch } = useContext(BoardDispatchContext)
  const { card, isOpen, onClose } = props

  const {
    job: { company_name, description, id, role, url }
  } = card

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    defaultValues: {
      company_name,
      description,
      id,
      role,
      url
    }
  })

  if (!card) return null

  const onSubmit = async (data) => {
    const updatedJob = await updateJob(data)
    dispatch(updateCardAction({ ...card, job: updatedJob }))
    onClose()
  }

  return (
    <Dialog className="relative z-10" onClose={onClose} open={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Legend>Job Posting</Legend>
          <Text>Update the details for this job posting.</Text>
          <FieldGroup>
            <Field>
              <Label>Role</Label>
              <Input
                aria-label="Role"
                name="role"
                {...register('role', { required: true })}
              />
            </Field>
            <Field>
              <Label>Company Name</Label>
              <Input
                aria-label="Company Name"
                name="company_name"
                {...register('company_name', { required: true })}
              />
            </Field>
            <Field>
              <Label>Link to posting</Label>
              <InputGroup>
                <LinkIcon />
                <Input
                  aria-label="Link to posting"
                  invalid={errors.url}
                  name="url"
                  placeholder="https://example.com"
                  type="url"
                  {...register('url')}
                />
                {errors.url && (
                  <ErrorMessage>{errors.url.message}</ErrorMessage>
                )}
              </InputGroup>
            </Field>
            <Field>
              <Label>Description</Label>
              <JobEditor />
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
