json.(talent, :email, :first_name, :last_name, :preferences, :description, :country, :language)
json.resumes talent.resumes do |resume|
  json.name resume.filename.to_s
  json.url rails_blob_url(resume, **Rails.application.routes.default_url_options)
end
