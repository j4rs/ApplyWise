import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useForm } from 'react-hook-form'

export const EditCard = (props) => {
  const { card, isOpen, onClose, onSave } = props
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm()

  console.log(errors)
  if (!card) return null

  const {
    job: { company_name, description, id, role, url }
  } = card

  const updateJob = (data) => {
    fetch(`/dashboard/board/jobs/${id}`, {
      body: JSON.stringify({ job: data }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    }).then(() => onSave(card))
    onClose()
  }

  const onSubmit = (data) => updateJob(data)

  return (
    <Dialog className="relative z-10" onClose={onClose} open={isOpen}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <form
                className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-zinc-600 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">
                        Job Posting
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          className="relative rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={onClose}
                          type="button"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-300">
                        Fill the information below to fulfill the job posting
                        card.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div>
                          <label
                            className="block text-sm/6 font-medium text-gray-900"
                            htmlFor="project-name"
                          >
                            Role
                          </label>
                          <div className="mt-2">
                            <input
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              defaultValue={role}
                              id="role"
                              type="text"
                              {...register('role', { required: true })}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            className="block text-sm/6 font-medium text-gray-900"
                            htmlFor="company-name"
                          >
                            Company Name
                          </label>
                          <div className="relative mt-2">
                            <input
                              className={
                                errors.company_name
                                  ? 'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm/6'
                                  : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
                              }
                              defaultValue={company_name}
                              id="company-name"
                              type="text"
                              {...register('company_name', { required: true })}
                              aria-invalid={
                                errors.company_name ? 'true' : 'false'
                              }
                            />
                            {errors.company_name && (
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon
                                  aria-hidden="true"
                                  className="size-5 text-red-500"
                                />
                              </div>
                            )}
                          </div>
                          {errors.company_name && (
                            <p
                              className="mt-2 text-sm text-red-600"
                              id="company-name-error"
                            >
                              Not a valid company name.
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            className="block text-sm/6 font-medium text-gray-900"
                            htmlFor="company-name"
                          >
                            Link to job posting
                          </label>
                          <div className="mt-2">
                            <input
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              defaultValue={url}
                              id="url"
                              type="text"
                              {...register('url')}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            className="block text-sm/6 font-medium text-gray-900"
                            htmlFor="description"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              defaultValue={description}
                              id="description"
                              rows={4}
                              {...register('description')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end px-4 py-4">
                  <button
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
