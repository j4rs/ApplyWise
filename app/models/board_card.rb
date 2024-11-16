class BoardCard < ApplicationRecord
  include Partionable

  belongs_to :board_column, inverse_of: :board_cards
  belongs_to :job, dependent: :destroy

  accepts_nested_attributes_for :job

  before_validation :set_default_position, on: :create
  before_create :move_other_cards_down

  scope :ordered, -> { order(:position) }

  private

  def set_default_position
    return if position.present?

    self.position = 0
  end

  # Move all cards down by one position
  # to leave a gap for the new card at top
  def move_other_cards_down
    board_column
      .board_cards
      .where("position >= ?", position)
      .update_all("position = position + 1")
  end
end
