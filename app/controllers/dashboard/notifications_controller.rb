# frozen_string_literal: true

module Dashboard
  class NotificationsController < ApplicationController
    include Reactive

    # GET /dashboard/notifications
    def index
      @total_count =
        current_talent
        .notifications
        .count

      @notifications =
        current_talent
          .notifications
          .order(created_at: :desc)
          .offset((page - 1) * per_page)
          .limit(per_page)

      @page = page
      @per_page = per_page
    end

    private

    def page
      params[:page].to_i || 0
    end

    def per_page
      params[:per_page].to_i || 50
    end
  end
end
