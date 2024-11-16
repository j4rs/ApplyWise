json.slug @card.slug
json.(@card, :position)
json.job do
  json.id @card.job.slug
  json.(@card.job, :role, :company_name, :url, :color)
end
