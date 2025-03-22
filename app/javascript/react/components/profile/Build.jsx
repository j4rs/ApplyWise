import { XMarkIcon } from '@heroicons/react/20/solid'
import omit from 'lodash/omit'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { DashboardContext } from '../dashboard/DashboardContext'
import { Button } from '../ui/button'
import { FieldGroup, Fieldset } from '../ui/fieldset'

import { ResumeUpload } from './ResumeUpload'

export const Build = () => {
  const { addFlashMessage } = useContext(PubSubContext)
  const { onUpdateProfile, profile } = useContext(DashboardContext)

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: omit(profile, ['email', 'id', 'preferences', 'resumes'])
  })

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Append regular fields
    Object.keys(data).forEach((key) => {
      if (key === 'resumes') {
        // Handle files specially
        if (data.resumes.length > 0) {
          data.resumes.forEach((file) => {
            formData.append('profile[resumes][]', file)
          })
        }
      } else {
        // Use bracket notation for nested params
        formData.append(`profile[${key}]`, data[key] || '')
      }
    })

    await onUpdateProfile(formData)

    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Resume updated successfully...',
      type: 'toast'
    })
  }

  const renderFile = (file) => (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-sm bg-gray-100 rounded-md"
      key={file.filename}
    >
      <span className="flex items-center gap-2">
        <a href={file.url} rel="noopener noreferrer" target="_blank">
          {file.filename}
        </a>
      </span>
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        type="button"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </span>
  )

  return (
    <div className="py-4 bg-white rounded-md">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <FieldGroup>
            <ResumeUpload
              name="resumes"
              register={register}
              setValue={setValue}
            />
          </FieldGroup>
        </Fieldset>
        {profile.resumes.length > 0 && profile.resumes.map(renderFile)}
        <div className="flex justify-end">
          <Button color="blue" type="submit">
            Upload and Generate Skills
          </Button>
        </div>
      </form>
    </div>
  )
}
