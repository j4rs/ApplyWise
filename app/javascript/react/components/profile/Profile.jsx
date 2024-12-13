import { XMarkIcon } from '@heroicons/react/16/solid'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import omit from 'lodash/omit'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryList from 'react-select-country-list'

import { ComboBoxSelect } from '../custom/ComboBoxSelect'
import { DashboardContext } from '../dashboard/DashboardContext'
import { Button } from '../ui/button'
import { Divider } from '../ui/divider'
import { Description, Field, FieldGroup, Fieldset, Label } from '../ui/fieldset'
import { Heading } from '../ui/heading'
import { Input } from '../ui/input'
import { Listbox, ListboxLabel, ListboxOption } from '../ui/listbox'
import { Text } from '../ui/text'
import { Textarea } from '../ui/textarea'

import { ResumeUpload } from './ResumeUpload'

// Common languages with their native names
const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Português', value: 'pt' }
]

// Get formatted country list with flags
const COUNTRIES = countryList()
  .getData()
  .map((country) => ({
    flag: getUnicodeFlagIcon(country.value),
    label: country.label,
    value: country.value.toLowerCase()
  }))

export function Profile() {
  const { onUpdateProfile, profile } = useContext(DashboardContext)
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: omit(profile, ['email', 'id', 'preferences', 'resumes'])
  })

  const [country, setCountry] = useState(profile.country)
  const [language, setLanguage] = useState(profile.language)

  useEffect(() => {
    setValue('country', country.value)
    setValue('language', language)
  }, [country, language, setValue])

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

    return onUpdateProfile(formData)
  }

  const renderFile = (file) => (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-sm bg-gray-100 rounded-md"
      key={file.name}
    >
      <span className="flex items-center gap-2">
        <a href={file.url} rel="noopener noreferrer" target="_blank">
          {file.name}
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
    <>
      <Heading>Your profile</Heading>
      <Text>Update your profile information here.</Text>
      <Divider className="my-4" />
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
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
                  onChange={(value) => setCountry(value)}
                  placeholder="Search countries..."
                  renderItem={(item) =>
                    item && (
                      <span className="flex items-center gap-2">
                        <span className="w-5 sm:w-4">{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                    )
                  }
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
              <Label>Describe yourself and your skills</Label>
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
            <ResumeUpload
              name="resumes"
              register={register}
              setValue={setValue}
            />
          </FieldGroup>
        </Fieldset>
        {profile.resumes.length > 0 && profile.resumes.map(renderFile)}
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  )
}
