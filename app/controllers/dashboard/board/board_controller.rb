module Dashboard
  module Board
    class BoardController < ApplicationController
      include Reactive

      # GET /dashboard/board
      def show
        respond_to do |format|
          format.html
          format.json do
            @board = current_talent.job_board
          end
        end
      end
    end
  end
end
