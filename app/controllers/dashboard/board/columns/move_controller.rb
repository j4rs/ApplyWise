# frozen_string_literal: true

module Dashboard
  module Board
    module Columns
      class MoveController < ApplicationController
        skip_forgery_protection only: %i[ update ]

        # PATCH /dashboard/board/columns/:id/move
        def update
          current_talent
            .job_board
            .move_column!(column_params.merge(slug: params[:column_id]))

          head :no_content
        end

        private

        def column_params
          params
            .require(:column)
            .permit(:from_position, :to_position)
        end
      end
    end
  end
end
