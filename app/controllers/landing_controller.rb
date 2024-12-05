# frozen_string_literal: true

class LandingController < ApplicationController
  before_action :redirect_to_dashboard_if_logged_in, only: :index

  # GET /
  def index; end
end
