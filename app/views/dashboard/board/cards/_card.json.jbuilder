json.id card.slug
json.(card, :position)
json.column_id card.board_column.slug
json.job do
  json.id card.job.slug
  json.(card.job, :role, :company_name, :url, :color)
end
