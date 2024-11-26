json.id @board.slug
json.columns @board.board_columns, partial: "dashboard/board/column/columns/column", as: :column
