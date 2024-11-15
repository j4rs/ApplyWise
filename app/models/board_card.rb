class BoardCard < ApplicationRecord
  include Partionable

  belongs_to :board_column, inverse_of: :board_cards
  belongs_to :content, polymorphic: true

  accepts_nested_attributes_for :content

  before_validation :set_default_position, on: :create
  before_create :move_other_cards_down

  scope :ordered, -> { order(:position) }

  delegate :header,
           :subheader,
           to: :content

  def self.create_card_on_top!(params)
    # in a a single transaction create first the job then the card
    ActiveRecord::Base.transaction do
      content = Job.create!(params[:content])
      create!(content:)
    end
  end

  private

  def set_default_position
    return if position.present?

    self.position = 0
  end

  def move_other_cards_down
    board_column.board_cards.update_all("position = position + 1")
  end
end
