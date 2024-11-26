# frozen_string_literal: true

module Dashboard
  module Board
    module Column
      class MoveController < ApplicationController
        skip_forgery_protection only: %i[ update ]
        before_action :set_board, only: %i[ update ]

        # PATCH /dashboard/board/columns/:id/move
        def update
          @board.move_column!(column_params.merge(slug: params[:column_id]))

          head :no_content
        end

        private

        def set_board
          @board = ::Board.find_by!(slug: params[:board_id])
        end

        def column_params
          params
            .require(:column)
            .permit(:from_position, :to_position)
        end
      end
    end
  end
end
