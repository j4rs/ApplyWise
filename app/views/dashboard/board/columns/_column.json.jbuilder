json.id column.slug
json.(column, :name, :color, :collapsed)
json.cards column.board_cards, partial: "dashboard/board/cards/card", as: :card
