import { findBoardCard, findColumn } from './utils'

const UPDATE_BOARD = 'update_board'
const COLLAPSE_COLUMNS = 'collapse_columns'
const ADD_CARD = 'add_card'
const MOVE_CARD = 'move_card'
const INIT_BOARD = 'init_board'
const UPDATE_CARD = 'update_card'
const DELETE_CARD = 'delete_card'
const UPDATE_COLUMN = 'update_column'
const CREATE_COLUMN = 'create_column'
const DELETE_COLUMN = 'delete_column'
const MOVE_COLUMN = 'move_column'

export const boardReducer = (board, action) => {
  switch (action.type) {
    case INIT_BOARD: {
      board = action.payload.board
      break
    }
    case UPDATE_BOARD: {
      board.name = action.payload.board.name
      break
    }
    case COLLAPSE_COLUMNS: {
      board.columns.forEach((column) => {
        column.collapsed = action.payload.collapsed
      })
      break
    }
    case ADD_CARD: {
      const { card, columnId } = action.payload
      const column = findColumn(board, columnId)
      column.cards.unshift(card)

      break
    }
    case MOVE_CARD: {
      const { card, destination, source } = action.payload
      const sourceColumn = findColumn(board, source.fromColumnId)
      const destinationColumn = findColumn(board, destination.toColumnId)

      const boardCard = findBoardCard(board, card.id)
      boardCard.column_id = destination.toColumnId

      sourceColumn.cards.splice(source.fromPosition, 1) // remove card from source column
      destinationColumn.cards.splice(destination.toPosition, 0, boardCard) // add card to destination column

      break
    }
    case UPDATE_CARD: {
      const { card } = action.payload
      const boardCard = findBoardCard(board, card.id)
      boardCard.job = card.job

      break
    }
    case DELETE_CARD: {
      const {
        card: { column_id, id }
      } = action.payload

      const column = findColumn(board, column_id)
      column.cards = column.cards.filter((c) => c.id !== id)

      break
    }
    case CREATE_COLUMN: {
      const { column } = action.payload
      // mark all columns as not recent
      board.columns.forEach((c) => {
        c.recent = false
      })
      // mark the new column as recent
      board.columns.push({ ...column, recent: true })

      break
    }
    case UPDATE_COLUMN: {
      const { column } = action.payload
      const boardColumn = findColumn(board, column.id)

      boardColumn.name = column.name
      boardColumn.color = column.color
      boardColumn.collapsed = column.collapsed

      break
    }
    case DELETE_COLUMN: {
      const { column } = action.payload
      board.columns = board.columns.filter((c) => c.id !== column.id)

      break
    }
    case MOVE_COLUMN: {
      const { column, destination, source } = action.payload
      board.columns.splice(source.fromPosition, 1)
      board.columns.splice(destination.toPosition, 0, column)

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

export const deleteCardAction = (card) => ({
  payload: { card },
  type: DELETE_CARD
})

export const createColumnAction = (column) => ({
  payload: { column },
  type: CREATE_COLUMN
})

export const updateColumnAction = (column) => ({
  payload: { column },
  type: UPDATE_COLUMN
})

export const moveCardAction = (card, source, destination) => ({
  payload: { card, destination, source },
  type: MOVE_CARD
})

export const deleteColumnAction = (column) => ({
  payload: { column },
  type: DELETE_COLUMN
})

export const moveColumnAction = (column, source, destination) => ({
  payload: { column, destination, source },
  type: MOVE_COLUMN
})

export const updateBoardAction = (board) => ({
  payload: { board },
  type: UPDATE_BOARD
})

export const collapseColumnsAction = (collapsed) => ({
  payload: { collapsed },
  type: COLLAPSE_COLUMNS
})
