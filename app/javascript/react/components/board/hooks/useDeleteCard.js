import { useContext, useState } from 'react'

import { BoardDispatchContext } from '../BoardContext'
import { deleteCard } from '../network'
import { deleteCardAction } from '../reducer'

export const useDeleteCard = () => {
  const dispatch = useContext(BoardDispatchContext)
  const [removeCard, setRemoveCard] = useState(null)

  const onRemoveCard = async (card) => {
    const deletedCard = await deleteCard(card.id)
    dispatch(deleteCardAction(deletedCard))
    setRemoveCard(null)
  }

  return {
    onRemoveCard,
    removeCard,
    setRemoveCard
  }
}
