import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Description, Field, Label } from '../ui/fieldset'
import { Text } from '../ui/text'

export function ResumeUpload({ name = 'resumes', setValue }) {
  const [selectedFiles, setSelectedFiles] = React.useState([])

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Create a FileList-like object
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )

      // Set the files directly
      setValue(name, files)
      setSelectedFiles(files)
    },
    [name, setValue]
  )

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'application/msword': ['.doc'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx']
    },
    multiple: true, // Changed to true to support multiple files
    onDrop
  })

  const renderDropzoneContent = () => {
    if (selectedFiles.length > 0) {
      return (
        <div>
          <Text>
            <span>Selected files:</span>
            {selectedFiles.map((file, index) => (
              <span className="font-bold ml-2" key={index}>
                {file.name}
              </span>
            ))}
          </Text>
          <Text className="text-sm text-gray-500 mt-2">
            Click or drag to change files
          </Text>
        </div>
      )
    }

    if (isDragActive) {
      return <Text>Drop your resumes here...</Text>
    }

    return (
      <Text>Drag and drop your resumes here, or click to select files</Text>
    )
  }

  // Clean up previews when component unmounts
  React.useEffect(
    () => () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    },
    [selectedFiles]
  )

  return (
    <Field>
      <Label>Resumes</Label>
      <Description>
        Your resumes along with your description will help us create tailored
        resumes and cover letters for your applications.
      </Description>
      <div
        {...getRootProps()}
        className={`border-2 my-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        <input {...getInputProps()} />
        {renderDropzoneContent()}
        <Text className="text-sm text-gray-500 mt-2">
          Supported formats: PDF, DOC, DOCX
        </Text>
      </div>
    </Field>
  )
}
