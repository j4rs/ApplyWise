import React, { useRef, useState } from 'react'

import { Button } from '../ui/button'

export const AvatarUpload = ({
  onAvatarChange = () => {},
  setAvatarPreview
}) => {
  const fileInputRef = useRef(null)
  const [error, setError] = useState(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]

    // Validate file type
    if (file && file.type.startsWith('image/')) {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Call parent handler with file
      onAvatarChange(file)
    } else {
      setError('Please select an image file')
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div>
      <input
        accept="image/*"
        className="hidden"
        name="avatar"
        onChange={handleFileSelect}
        ref={fileInputRef}
        type="file"
      />

      <Button outline onClick={triggerFileInput}>
        Choose Avatar
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
