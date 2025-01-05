const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const fetchBoards = async () =>
  fetch('/dashboard/boards', { headers, method: 'GET' }).then((res) =>
    res.json()
  )

export const fetchBoard = async (id) =>
  fetch(`/dashboard/boards/${id}`, { headers, method: 'GET' }).then((res) =>
    res.json()
  )

export const createBoard = async (payload) =>
  fetch('/dashboard/boards', {
    body: JSON.stringify(payload),
    headers,
    method: 'POST'
  }).then((res) => res.json())

export const updateBoard = async (id, payload) =>
  fetch(`/dashboard/boards/${id}`, {
    body: JSON.stringify(payload),
    headers,
    method: 'PATCH'
  }).then((res) => res.json())

export const deleteBoard = async (id) =>
  fetch(`/dashboard/boards/${id}`, { method: 'DELETE' })

export const moveColumn = async (boardId, column, from, to) =>
  fetch(`/dashboard/boards/${boardId}/columns/${column.id}/move`, {
    body: JSON.stringify({ column: { from_position: from, to_position: to } }),
    headers,
    method: 'PATCH'
  })

export const collapseColumns = async (boardId, collapsed) =>
  fetch(`/dashboard/boards/${boardId}/collapse`, {
    body: JSON.stringify({ collapsed }),
    headers,
    method: 'PATCH'
  })

export const createColumn = async (boardId, payload) =>
  fetch(`/dashboard/boards/${boardId}/columns`, {
    body: JSON.stringify(payload),
    headers,
    method: 'POST'
  }).then((res) => res.json())

export const updateColumn = async (boardId, columnId, payload) =>
  fetch(`/dashboard/boards/${boardId}/columns/${columnId}`, {
    body: JSON.stringify(payload),
    headers,
    method: 'PATCH'
  }).then((res) => res.json())

export const deleteColumn = async (boardId, columnId) =>
  fetch(`/dashboard/boards/${boardId}/columns/${columnId}`, {
    method: 'DELETE'
  })

export const createCard = async (board_column_id, card) =>
  fetch('/dashboard/board/cards', {
    body: JSON.stringify({ board_column_id, card }),
    headers,
    method: 'POST'
  }).then((res) => res.json())

export const fetchJob = async (boardId, id) =>
  fetch(`/dashboard/boards/${boardId}/jobs/${id}`, {
    headers,
    method: 'GET'
  }).then((res) => res.json())

export const updateJob = async (job) =>
  fetch(`/dashboard/board/jobs/${job.id}`, {
    body: JSON.stringify({ job }),
    headers,
    method: 'PATCH'
  }).then((res) => res.json())

export const moveCard = async (card, from, to) =>
  fetch(`/dashboard/board/cards/${card.id}`, {
    body: JSON.stringify({ card: { from, to } }),
    headers,
    method: 'PATCH'
  })

export const deleteCard = async (cardId) =>
  fetch(`/dashboard/board/cards/${cardId}`, { method: 'DELETE' }).then((res) =>
    res.json()
  )

export const updateTalentPreferences = async (prefs) =>
  fetch('/preferences', {
    body: JSON.stringify({ preferences: { ...prefs } }),
    headers,
    method: 'PATCH'
  })

export const fetchProfileBasic = async () =>
  fetch('/dashboard/profile/basic', { headers, method: 'GET' }).then((res) =>
    res.json()
  )

export const updateProfileBasic = async (payload) =>
  fetch('/dashboard/profile/basic', {
    body: payload,
    method: 'PATCH'
  }).then((res) => res.json())

export const fetchNotifications = async (page, perPage) =>
  fetch(`/dashboard/notifications?page=${page}&per_page=${perPage}`, {
    headers,
    method: 'GET'
  }).then((res) => res.json())
