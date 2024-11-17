export const fetchBoard = (callback) =>
  fetch('/dashboard/board.json')
    .then((res) => res.json())
    .then((board) => callback(board))

export const updateBoard = (data) => {
  const board = {
    columns: data.columns.map((c, idx) => ({ id: c.id, position: idx }))
  }
  fetch(`/dashboard/board`, {
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })
}

export const createCard = (board_column_id, card) => {
  fetch('/dashboard/board/cards', {
    body: JSON.stringify({ board_column_id, card }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

export const updateJob = (job, callback) => {
  fetch(`/dashboard/board/jobs/${job.id}`, {
    body: JSON.stringify({ job }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })
    .then((res) => res.json())
    .then((res) => callback(res))
}
