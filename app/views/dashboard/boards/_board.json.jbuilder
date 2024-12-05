json.id board.slug
json.(board, :name)
json.columns board.board_columns, partial: "dashboard/board/columns/column", as: :column
