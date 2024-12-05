# == Schema Information
#
# Table name: board_columns
#
#  id           :bigint           not null, primary key
#  collapsed    :boolean          default(FALSE)
#  color        :string
#  name         :string           not null
#  position     :integer          not null
#  slug         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  board_id     :bigint           not null
#  partition_id :integer          not null
#
# Indexes
#
#  index_board_columns_on_board_id               (board_id)
#  index_board_columns_on_partition_id           (partition_id)
#  index_board_columns_on_partition_id_and_slug  (partition_id,slug)
#  index_board_columns_on_slug                   (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (board_id => boards.id)
#
class BoardColumn < ApplicationRecord
  include Partionable

  DEFAULT_COLUMNS_ATTRIBUTES = [
    { name: "Wish", color: "red", position: 0 },
    { name: "Applied", color: "yellow", position: 1 },
    { name: "Contacted", color: "blue", position: 2 },
    { name: "Interview", color: "green", position: 3 },
    { name: "Rejected", color: "zinc", position: 4 }
  ].freeze

  belongs_to :board
  has_many :board_cards, -> { ordered }, dependent: :destroy

  scope :ordered, -> { order(:position) }
  scope :collapsed, -> { where(collapsed: true) }

  before_validation :set_default_position, on: :create

  def self.create_defaults!(attributes = {})
    ActiveRecord::Base.transaction do
      DEFAULT_COLUMNS_ATTRIBUTES.each { |column| create!(column.merge(attributes)) }

      wish_column = find_by!(name: "Wish")
      # Sample job
      job = Job.create!(role: "Software Engineer", company_name: "Google")
      BoardCard.create!(board_column: wish_column, job:)
    end
  end

  def move_below_cards_down_from!(position)
    board_cards
      .where("position >= ?", position)
      .update_all("position = position + 1")
  end

  def move_below_cards_up_from!(position)
    board_cards
      .where("position > ?", position)
      .update_all("position = position - 1")
  end

  private

  def set_default_position
    return if position.present?

    self.position = board.board_columns.count
  end
end
