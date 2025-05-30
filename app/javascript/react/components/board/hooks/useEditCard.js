// app/javascript/react/components/board/hooks/useEditCard.js
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { BoardDispatchContext } from '../BoardContext'
import { updateJob } from '../network'
import { updateCardAction } from '../reducer'

export const useEditCard = (card, onClose, onSave) => {
  const dispatch = useContext(BoardDispatchContext)

  const {
    job: { company_name, description, id, role, url }
  } = card || {}

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

  const onSubmit = async (data) => {
    const updatedJob = await updateJob(data)
    if (card.id) dispatch(updateCardAction({ ...card, job: updatedJob }))
    if (onClose) onClose()
    if (onSave) onSave(updatedJob)
  }

  return {
    errors,
    handleSubmit,
    onSubmit,
    register
  }
}
