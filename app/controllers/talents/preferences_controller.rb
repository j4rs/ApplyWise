# frozen_string_literal: true

module Talents
  class PreferencesController < ApplicationController
    skip_forgery_protection only: %i[ update ]
    before_action :authenticate_talent!

    # PATCH /preferences
    def update
      current_talent.update!(talent_params)

      head :no_content
    end

    private def talent_params
      params
        .require(:preferences)
        .permit(:is_sidebar_collapsed, :last_seen_board_id, :jobs_layout)
    end
  end
end
