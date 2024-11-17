export const findColumn = (board, columnId) =>
  board.columns.find((c) => c.id === columnId)

export const findBoardCard = (board, cardId) =>
  board.columns.flatMap((c) => c.cards).find((c) => c.id === cardId)
