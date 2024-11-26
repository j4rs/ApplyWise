# frozen_string_literal: true

module Dashboard
  module Board
    class BoardsController < ApplicationController
      include Reactive

      # GET /dashboard/boards/:id
      def show
        respond_to do |format|
          format.html
          format.json do
            @board =
              current_talent
                .boards
                .find_by(slug: params[:id])
          end
        end
      end
    end
  end
end
