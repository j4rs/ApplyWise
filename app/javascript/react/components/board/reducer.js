import { findBoardCard, findColumn } from './utils'

const ADD_CARD = 'add_card'
const INIT_BOARD = 'init_board'
const UPDATE_CARD = 'update_card'

export const boardReducer = (board, action) => {
  switch (action.type) {
    case INIT_BOARD: {
      board = action.payload.board
      break
    }
    case ADD_CARD: {
      const { card, columnId } = action.payload
      const column = findColumn(board, columnId)
      column.cards.push(card)

      break
    }
    case UPDATE_CARD: {
      const { card } = action.payload
      const boardCard = findBoardCard(board, card.id)
      boardCard.job = card.job

      break
    }
    default:
      return board
  }
  return board
}

export const initBoardAction = (board) => ({
  payload: { board },
  type: INIT_BOARD
})

export const addCardAction = (columnId, card) => ({
  payload: {
    card,
    columnId
  },
  type: ADD_CARD
})

export const updateCardAction = (card) => ({
  payload: { card },
  type: UPDATE_CARD
})
