module Dashboard
  module Board
    class BoardController < ApplicationController
      include Reactive
      skip_forgery_protection only: %i[update]

      # GET /dashboard/board
      def show
        respond_to do |format|
          format.html
          format.json do
            @board = current_talent.job_board
          end
        end
      end

      def update
        current_talent
          .job_board
          .update_column_positions(board_params)

        head :ok
      end

      private

      def board_params
        params
          .require(:board)
          .permit(columns: [ :id, :position ])
      end
    end
  end
end
