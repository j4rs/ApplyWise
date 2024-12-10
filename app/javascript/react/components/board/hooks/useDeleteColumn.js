import React, { useContext } from 'react'

import { BoardContext, BoardDispatchContext } from '../BoardContext'
import { deleteColumn } from '../network'
import { deleteColumnAction } from '../reducer'

export const useDeleteColumn = () => {
  const board = useContext(BoardContext)
  const dispatch = useContext(BoardDispatchContext)
  const [removeColumn, setRemoveColumn] = React.useState(null)

  const onRemoveColumn = async (column) => {
    await deleteColumn(board.id, column.id)
    dispatch(deleteColumnAction(column))
    setRemoveColumn(null)
  }

  return {
    onRemoveColumn,
    removeColumn,
    setRemoveColumn
  }
}
