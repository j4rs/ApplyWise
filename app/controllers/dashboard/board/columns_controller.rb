# frozen_string_literal: true

module Dashboard
  module Board
    class ColumnsController < ApplicationController
      skip_forgery_protection only: %i[ create update destroy ]
      before_action :set_column, only: %i[ update destroy ]

      # POST /dashboard/board/columns
      def create
        @column =
          current_talent
            .job_board
            .board_columns
            .create!(column_params)
      end

      # PATCH /dashboard/board/columns/:id
      def update
        @column.update!(column_params)
      end

      def destroy
        @column.destroy!
        head :no_content
      end

      private

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
