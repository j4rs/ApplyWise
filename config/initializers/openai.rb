OpenAI.configure do |config|
  config.access_token = Rails.application.credentials.dig(:open_ai, :dev, :access_token)
  config.organization_id = Rails.application.credentials.dig(:open_ai, :dev, :organization)
  config.log_errors = true if Rails.env.development?
end
