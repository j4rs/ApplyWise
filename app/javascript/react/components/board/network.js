const headers = {
  'Content-Type': 'application/json'
}

export const fetchBoard = (callback) =>
  fetch('/dashboard/board.json')
    .then((res) => res.json())
    .then((board) => callback(board))

export const moveColumn = (column, from, to) => {
  fetch(`/dashboard/board/columns/${column.id}/move`, {
    body: JSON.stringify({ column: { from_position: from, to_position: to } }),
    headers,
    method: 'PATCH'
  })
}

export const createColumn = (payload, callback) => {
  fetch('/dashboard/board/columns', {
    body: JSON.stringify(payload),
    headers,
    method: 'POST'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}

export const updateColumn = (columnId, payload, callback) => {
  fetch(`/dashboard/board/columns/${columnId}`, {
    body: JSON.stringify(payload),
    headers,
    method: 'PATCH'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}

export const deleteColumn = (columnId, callback) => {
  fetch(`/dashboard/board/columns/${columnId}`, { method: 'DELETE' }).then(() =>
    callback(columnId)
  )
}

export const createCard = (board_column_id, card, callback) => {
  fetch('/dashboard/board/cards', {
    body: JSON.stringify({ board_column_id, card }),
    headers,
    method: 'POST'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}

export const updateJob = (job, callback) => {
  fetch(`/dashboard/board/jobs/${job.id}`, {
    body: JSON.stringify({ job }),
    headers,
    method: 'PATCH'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}

export const moveCard = (card, from, to) => {
  fetch(`/dashboard/board/cards/${card.id}`, {
    body: JSON.stringify({ card: { from, to } }),
    headers,
    method: 'PATCH'
  })
}

export const deleteCard = (cardId, callback) => {
  fetch(`/dashboard/board/cards/${cardId}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((res) => callback(res))
}
