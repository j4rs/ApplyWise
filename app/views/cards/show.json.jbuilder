json.id @card.slug
json.content do
  json.id @card.content.slug
  json.(@card.content, :role, :company_name, :url, :color)
end
