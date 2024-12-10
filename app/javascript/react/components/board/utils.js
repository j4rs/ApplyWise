import { bgColors } from '../../toolsets/colors'

export const findColumn = (board, columnId) =>
  board.columns.find((c) => c.id === columnId)

export const findBoardCard = (board, cardId) =>
  board.columns.flatMap((c) => c.cards).find((c) => c.id === cardId)

export const classNames = (...classes) => classes.filter(Boolean).join(' ')

export const randomColor = () => {
  const colors = Object.keys(bgColors)
  return colors[Math.floor(Math.random() * colors.length)]
}
