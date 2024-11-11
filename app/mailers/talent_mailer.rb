# frozen_string_literal: true

class TalentMailer < ApplicationMailer
  def magic_link(email, token)
    @token = token
    mail(to: email, subject: "Your Magic Link for Sign In")
  end
end
