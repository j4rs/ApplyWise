json.notifications do
  json.partial! "notification", collection: @notifications, as: :notification
end
json.total_count @total_count
json.page @page
json.per_page @per_page
