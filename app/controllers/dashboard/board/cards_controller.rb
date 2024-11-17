# frozen_string_literal: true

module Dashboard
  module Board
    class CardsController < ApplicationController
      skip_forgery_protection only: %i[ create destroy update ]

      before_action :set_board_column, only: %i[ create destroy ]
      before_action :set_card, only: %i[ destroy ]

      # POST /dashboard/board/cards
      def create
        @card = @board_column.board_cards.create!(card_params)

        render :show
      end

      # PATCH /dashboard/board/cards/:id
      def update
        BoardCard.move_card!(params)
        head :no_content
      end

      # DELETE /dashboard/board/cards/:id
      def destroy
        @card.destroy
        head :no_content
      end

      private

      def set_board_column
        @board_column = BoardColumn.find_by!(slug: params[:board_column_id])
      end

      def set_card
        @card =
          @board_column
            .board_cards
            .find_by!(slug: params[:id])
      end

      def create_card
        @board_column.board_cards.create!(card_params)
      end

      def card_params
        params
          .require(:card)
          .permit(:slug,
                  from: %i[ position column_id ],
                  to: %i[ position column_id ],
                  job_attributes: %i[ role company_name description url color ])
      end
    end
  end
end
