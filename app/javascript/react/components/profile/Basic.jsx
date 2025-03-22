import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import omit from 'lodash/omit'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryList from 'react-select-country-list'

import { PubSubContext } from '../../pubsub/PubSubContext'
import { ComboBoxSelect } from '../custom/ComboBoxSelect'
import { DashboardContext } from '../dashboard/DashboardContext'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { Description, Field, FieldGroup, Fieldset, Label } from '../ui/fieldset'
import { Input } from '../ui/input'
import { Listbox, ListboxLabel, ListboxOption } from '../ui/listbox'
import { Textarea } from '../ui/textarea'

import { AvatarUpload } from './UploadAvatar'

// Common languages with their native names
const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Português', value: 'pt' }
]

const initials = (profile) =>
  `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`

// Get formatted country list with flags
const COUNTRIES = countryList()
  .getData()
  .map((country) => ({
    flag: getUnicodeFlagIcon(country.value),
    label: country.label,
    value: country.value.toLowerCase()
  }))

export const Basic = () => {
  const { addFlashMessage } = useContext(PubSubContext)
  const { onUpdateProfile, profile } = useContext(DashboardContext)

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: omit(profile, ['email', 'id', 'preferences', 'resumes'])
  })

  const [country, setCountry] = useState(profile.country)
  const [language, setLanguage] = useState(profile.language)

  const [avatarPreview, setAvatarPreview] = useState(profile.avatar)
  const [newAvatar, setNewAvatar] = useState(null)

  register('country', { value: country })
  register('language', { value: language })

  useEffect(() => {
    setValue('country', country)
  }, [country, setValue])

  useEffect(() => {
    register('language', { value: language })
    setValue('language', language)
  }, [language, register, setValue])

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Append regular fields
    Object.keys(data).forEach((key) => {
      formData.append(`profile[${key}]`, data[key] || '')
    })

    if (newAvatar?.size > 0) {
      formData.append('profile[avatar]', newAvatar)
    } else formData.delete('profile[avatar]')

    await onUpdateProfile(formData)

    addFlashMessage({
      duration: 3000,
      icon: 'success',
      title: 'Profile updated successfully...',
      type: 'toast'
    })
  }

  return (
    <div className="py-4 bg-white rounded-md">
      <form
        className="space-y-4"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fieldset>
          <FieldGroup>
            <div className="flex items-center gap-4">
              <Avatar
                className="size-20"
                initials={initials(profile)}
                src={avatarPreview}
              />
              <AvatarUpload
                onAvatarChange={setNewAvatar}
                register={register}
                setAvatarPreview={setAvatarPreview}
              />
            </div>
          </FieldGroup>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
              <Field>
                <Label>First name</Label>
                <Input
                  name="first_name"
                  {...register('first_name')}
                  defaultValue={profile.first_name}
                />
              </Field>
              <Field>
                <Label>Last name</Label>
                <Input
                  name="last_name"
                  {...register('last_name')}
                  defaultValue={profile.last_name}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
              <Field>
                <Label>Country</Label>
                <ComboBoxSelect
                  className="mt-3"
                  defaultValue={COUNTRIES.find(
                    (c) => c.value === profile.country
                  )}
                  items={COUNTRIES}
                  onChange={(c) => setCountry(c.value)}
                  placeholder="Search the country..."
                  renderItem={(item) => (
                    <span className="flex items-center gap-2">
                      <span className="w-5 sm:w-4">{item.flag}</span>
                      <span>{item.label}</span>
                    </span>
                  )}
                />
              </Field>
              <Field>
                <Label>Language</Label>
                <Listbox
                  name="language"
                  onChange={(value) => setLanguage(value)}
                  placeholder="Select language..."
                  value={language}
                >
                  {LANGUAGES.map((lang) => (
                    <ListboxOption key={lang.value} value={lang.value}>
                      <ListboxLabel>{lang.label}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
              </Field>
            </div>
            <Field>
              <Label>Describe yourself</Label>
              <Description>
                This will be used to create tailored resumes and cover letters
                for your applications.
              </Description>
              <Textarea
                name="description"
                {...register('description')}
                defaultValue={profile.description}
              />
            </Field>
          </FieldGroup>
        </Fieldset>
        <div className="flex justify-end">
          <Button color="blue" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
