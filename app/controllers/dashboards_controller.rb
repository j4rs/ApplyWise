class DashboardsController < ApplicationController
  before_action :authenticate_talent!

  # GET /dashboard
  def show
  end
end
