import { v4 as uuid } from 'uuid'

import { createCard } from '../network'
import { addCardAction } from '../reducer'

export const AddCard = async (columnId, dispatch) => {
  const id = uuid()
  const card = {
    id,
    job: {
      company_name: 'COMPANY NAME',
      role: 'ROLE'
    }
  }

  const newCard = await createCard(columnId, {
    job_attributes: card.job,
    slug: id
  })
  dispatch(addCardAction(columnId, newCard))

  return newCard
}
