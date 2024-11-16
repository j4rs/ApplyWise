json.id @card.slug
json.job do
  json.id @card.job.slug
  json.(@card.job, :role, :company_name, :url, :color)
end
