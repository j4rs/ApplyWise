# frozen_string_literal: true

class TalentMailerPreview < ActionMailer::Preview
  def magic_link
    TalentMailer.magic_link("test@example.com", "abc123")
  end
end
