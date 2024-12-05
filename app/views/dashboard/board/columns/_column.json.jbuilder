json.id column.slug
json.(column, :name, :color, :collapsed, :position)
json.cards column.board_cards, partial: "dashboard/board/cards/card", as: :card
