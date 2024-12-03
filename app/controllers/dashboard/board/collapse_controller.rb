# frozen_string_literal: true

module Dashboard
  module Board
    class CollapseController < ApplicationController
      skip_forgery_protection only: %i[ update ]
      before_action :set_board, only: %i[ update ]

      # PATCH /dashboard/board/columns/:id/collapse
      def update
        @board.board_columns.update_all(collapsed: params[:collapsed])

        head :no_content
      end

      private

      def set_board
        @board = ::Board.find_by!(slug: params[:board_id])
      end
    end
  end
end
