const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const fetchBoard = (id, callback) =>
  fetch(`/dashboard/boards/${id}`, { headers, method: 'GET' })
    .then((res) => res.json())
    .then((board) => callback(board))

export const moveColumn = (boardId, column, from, to) => {
  fetch(`/dashboard/boards/${boardId}/columns/${column.id}/move`, {
    body: JSON.stringify({ column: { from_position: from, to_position: to } }),
    headers,
    method: 'PATCH'
  })
}

export const createColumn = (boardId, payload, callback) => {
  fetch(`/dashboard/boards/${boardId}/columns`, {
    body: JSON.stringify(payload),
    headers,
    method: 'POST'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}

export const updateColumn = (boardId, columnId, payload, callback) => {
  fetch(`/dashboard/boards/${boardId}/columns/${columnId}`, {
    body: JSON.stringify(payload),
    headers,
    method: 'PATCH'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}

export const deleteColumn = (boardId, columnId, callback) => {
  fetch(`/dashboard/boards/${boardId}/columns/${columnId}`, {
    method: 'DELETE'
  }).then(() => callback(columnId))
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
