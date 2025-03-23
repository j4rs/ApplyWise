import { XMarkIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export const EditCard = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    description: job.description || '',
    postingUrl: job.postingUrl || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would update the job with the new data
    // For example: updateJob(job.id, formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-zinc-900/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Job Details</h2>
          <Button plain onClick={onClose}>
            <XMarkIcon className="size-5" />
          </Button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="postingUrl"
            >
              Job Posting URL
            </label>
            <Input
              id="postingUrl"
              name="postingUrl"
              onChange={handleChange}
              placeholder="https://example.com/job-posting"
              type="url"
              value={formData.postingUrl}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="description"
            >
              Job Description
            </label>
            <Textarea
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="Enter job description"
              rows={8}
              value={formData.description}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button outline onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
