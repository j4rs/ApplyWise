class BoardCard < ApplicationRecord
  include Partionable

  belongs_to :board_column, inverse_of: :board_cards
  belongs_to :job, dependent: :destroy

  accepts_nested_attributes_for :job

  before_validation :set_default_position, on: :create
  before_create :move_other_cards_down

  after_destroy :move_other_cards_up

  scope :ordered, -> { order(:position) }

  def self.move_card!(params)
    card = find_by!(slug: params[:id])
    current_column = card.board_column

    to_params = params[:card][:to]
    from_params = params[:card][:from]

    new_column = BoardColumn.find_by!(slug: to_params[:column_id])
    from_position = from_params[:position]
    new_position = to_params[:position]

    card.transaction do
      # Move all cards below the from position up
      current_column.move_below_cards_up_from!(from_position)
      # Move all cards below the new position down
      new_column.move_below_cards_down_from!(new_position)
      # Update the card with the new column and position
      card.update!(board_column: new_column, position: new_position)
    end
  end

  private

  def set_default_position
    return if position.present?

    self.position = 0
  end

  # Move all cards down by one position
  # to leave a gap for the new card at top
  def move_other_cards_down
    board_column.move_below_cards_down_from!(position)
  end

  def move_other_cards_up
    board_column.move_below_cards_up_from!(position)
  end
end
