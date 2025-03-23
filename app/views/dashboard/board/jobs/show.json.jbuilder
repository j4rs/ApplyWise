json.id @job.slug
json.(@job, :role, :description, :company_name, :url, :color)
json.contacts @job.contacts, partial: "dashboard/contacts/contact", as: :contact
json.notes @job.notes, partial: "dashboard/board/jobs/notes/note", as: :note
