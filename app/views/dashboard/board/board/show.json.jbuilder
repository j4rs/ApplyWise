json.id @board.slug
json.columns @board.board_columns do |column|
  json.id column.slug
  json.(column, :name, :color)
  json.cards column.board_cards do |card|
    json.id card.slug
    json.job do
      json.id card.job.slug
      json.(card.job, :role, :company_name, :url, :color)
    end
  end
end
