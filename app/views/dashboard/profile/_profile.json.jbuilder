json.(talent, :email, :first_name, :last_name, :preferences, :description, :country, :language)
json.resumes talent.resumes, :filename, :url
json.avatar talent.avatar.attached? ? talent.avatar.url : nil
json.build talent.last_text_pdf.build
