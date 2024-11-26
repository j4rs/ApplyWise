# frozen_string_literal: true

module Dashboard
  module Board
    module Column
      class ColumnsController < ApplicationController
        skip_forgery_protection only: %i[ create update destroy ]
        before_action :set_board, only: %i[ create ]
        before_action :set_column, only: %i[ update destroy ]

        # POST /dashboard/boards/:board_id/columns
        def create
          @column = @board.board_columns.create!(column_params)
        end

        # PATCH /dashboard/boards/:board_id/columns/:id
        def update
          @column.update!(column_params)
        end

        # DELETE /dashboard/boards/:board_id/columns/:id
        def destroy
          @column.destroy!
          head :no_content
        end

        private

        def set_board
          @board = ::Board.find_by!(slug: params[:board_id])
        end

        def set_column
          @column = BoardColumn.find_by!(slug: params[:id])
        end

        def column_params
          params
            .require(:column)
            .permit(:name, :color, :collapsed)
        end
      end
    end
  end
end
