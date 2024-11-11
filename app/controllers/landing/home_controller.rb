# frozen_string_literal: true

module Landing
  class HomeController < ApplicationController
    before_action :redirect_to_dashboard_if_logged_in, only: :index

    # GET /
    def index; end
  end
end
