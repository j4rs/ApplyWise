# frozen_string_literal: true

module Dashboard
  class BoardsController < ApplicationController
    include Reactive

    skip_forgery_protection only: %i[ create update destroy ]
    before_action :set_board, only: %i[ show update destroy ]
    after_action :update_talent_last_seen_board_id, only: %i[ show ]

    # GET /dashboard/boards
    def index
      @boards =
        current_talent
          .boards
          .includes(board_columns: [ board_cards: [ :job ] ])
          .order(id: :desc)
    end

    # GET /dashboard/boards/:id
    def show; end

    # POST /dashboard/boards
    def create
      @board =
        current_talent
          .boards
          .create_with_initial_columns!(board_params)
    end

    # PATCH /dashboard/boards/:id
    def update
      @board.update(board_params)
      render json: @board
    end

    # DELETE /dashboard/boards/:id
    def destroy
      @board.destroy
      head :no_content
    end

    private

    def set_board
      @board = current_talent.boards.find_by(slug: params[:id])
    end

    def board_params
      params.require(:board).permit(:name)
    end

    def update_talent_last_seen_board_id
      current_talent.update!(last_seen_board_id: @board.slug)
    end
  end
end
