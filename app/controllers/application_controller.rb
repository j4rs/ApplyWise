class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :set_partition

  helper_method :current_talent

  def authenticate_talent!
    redirect_to new_session_path unless current_talent
  end

  def current_talent
    return nil unless current_talent_id

    @current_talent ||= Talent.find_by(id: current_talent_id)
  end

  private

  def set_partition
    Current.partition = current_talent
  end

  def current_talent_id = session[:current_talent_id]

  def redirect_to_dashboard_if_logged_in
    redirect_to dashboard_path if current_talent
  end
end
