class BoardColumn < ApplicationRecord
  include Partionable

  DEFAULT_COLUMNS_ATTRIBUTES = [
    { name: "Wish", color: "red", position: 0 },
    { name: "Applied", color: "yellow", position: 1 },
    { name: "Contacted", color: "blue", position: 2 },
    { name: "Interview", color: "green", position: 3 }
  ].freeze

  belongs_to :board
  has_many :board_cards, -> { ordered }, dependent: :destroy

  scope :ordered, -> { order(:position) }

  def self.create_defaults!(attributes = {})
    ActiveRecord::Base.transaction do
      DEFAULT_COLUMNS_ATTRIBUTES.each { |column| create!(column.merge(attributes)) }

      wish_column = find_by!(name: "Wish")
      # Sample content
      content = Job.create!(role: "Software Engineer", company_name: "Google")
      BoardCard.create!(board_column: wish_column, content:, position: 0)
    end
  end
end
