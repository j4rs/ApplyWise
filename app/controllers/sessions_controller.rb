# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_forgery_protection only: %i[destroy]

  # GET /sessions/new
  def new
    redirect_to dashboard_path if current_talent
  end

  # POST /sessions
  def create
    message = SignedMessage.generate!(email, purpose: :sign_in)

    TalentMailer
      .magic_link(params[:email], message.token)
      .deliver_later

    redirect_to new_session_path,
                notice: I18n.t("sessions.create.notice", email:)
  end

  # GET /sessions/:id
  def show
    email = SignedMessage.use!(token)

    talent = Talent.find_or_create_by!(email:)
    session[:current_talent_id] = talent.id

    redirect_to dashboard_path,
                notice: I18n.t("sessions.show.notice", email:)
  end

  # DELETE /sessions
  def destroy
    session.delete(:current_talent_id)

    head :no_content
  end

  private def email
    @email = params[:email]
  end

  private def token = params[:id]
end
