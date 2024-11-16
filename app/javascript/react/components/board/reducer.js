import { useReducer } from 'react'


export const boardReducer = (board, action) => {
  switch(action.type) {
    case 'add_card':
      return { ...board, columns: board.columns.map((c) => ({ ...c, cards: [...c.cards, action.card] })) }
  }
}
