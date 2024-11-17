const ADD_CARD = 'add_card'

const findColumn = (board, columnId) =>
  board.columns.find((c) => c.id === columnId)

export const boardReducer = (board, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const column = findColumn(board, action.columnId)
      column.cards.push(action.card)
      break
    }
    default:
      return board
  }
  return board
}

export const addCard = (card) => ({
  card,
  type: ADD_CARD
})
