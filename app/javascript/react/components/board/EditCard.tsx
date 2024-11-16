import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { useForm } from 'react-hook-form'

export const EditCard = (props) => {
  const { isOpen, card, onSave, onClose } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(errors)
  if(!card) return null

  const { job: { id, role, company_name, description, url, color }, column_id } = card

  const onSubmit = (data) => updateJob(data)

  const updateJob = (data) => {
    fetch(`/dashboard/board/jobs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ job: data }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => onSave(card))
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-zinc-600 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">Job Posting</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={onClose}
                          className="relative rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-300">
                        Fill the information below to fulfill the job posting card.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div>
                          <label htmlFor="project-name" className="block text-sm/6 font-medium text-gray-900">
                            Role
                          </label>
                          <div className="mt-2">
                            <input
                              id="role"
                              type="text"
                              defaultValue={role}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              {...register("role", { required: true })}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="company-name" className="block text-sm/6 font-medium text-gray-900">
                            Company Name
                          </label>
                          <div className="relative mt-2">
                            <input
                              id="company-name"
                              type="text"
                              defaultValue={company_name}
                              className={
                                errors.company_name ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm/6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              }
                              {...register("company_name", { required: true })}
                              aria-invalid={errors.company_name ? "true" : "false"}
                            />
                            {errors.company_name && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon aria-hidden="true" className="size-5 text-red-500" />
                              </div>
                            )}
                          </div>
                          {errors.company_name && (
                            <p id="company-name-error" className="mt-2 text-sm text-red-600">
                              Not a valid company name.
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="company-name" className="block text-sm/6 font-medium text-gray-900">
                            Link to job posting
                          </label>
                          <div className="mt-2">
                            <input
                              id="url"
                              type="text"
                              defaultValue={url}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              {...register("url")}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              rows={4}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              defaultValue={description}
                              {...register("description")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
