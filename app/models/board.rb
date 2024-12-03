# == Schema Information
#
# Table name: boards
#
#  id           :bigint           not null, primary key
#  name         :string
#  purpose      :string           default("jobs"), not null
#  slug         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  partition_id :integer          not null
#  talent_id    :bigint           not null
#
# Indexes
#
#  index_boards_on_partition_id           (partition_id)
#  index_boards_on_partition_id_and_slug  (partition_id,slug)
#  index_boards_on_slug                   (slug) UNIQUE
#  index_boards_on_talent_id              (talent_id)
#
# Foreign Keys
#
#  fk_rails_...  (talent_id => talents.id)
#
class Board < ApplicationRecord
  include Partionable

  belongs_to :talent, inverse_of: :boards
  has_many :board_columns, -> { ordered }, dependent: :destroy

  scope :jobs, -> { where(purpose: :jobs) }

  def self.create_with_initial_columns!(attributes = {})
    attributes[:name] ||= "Job Board #{Time.current.year}"
    create!(attributes).tap do |board|
      BoardColumn.create_defaults!(board:)
    end
  end

  def move_column!(column_params)
    slug, from_position, to_position =
      column_params
        .values_at(:slug, :from_position, :to_position)

    column = board_columns.find_by!(slug:)
    direction = from_position < to_position ? :down : :up

    column.transaction do
      case direction
      when :up
        # Move all columns below the from position down
        # to leave room for the column
        board_columns
          .where("position between ? and ?", to_position, from_position)
          .update_all("position = position + 1")
      when :down
        # Move all columns below the to position up
        # to leave room for the column
        board_columns
          .where("position between ? and ?", from_position, to_position)
          .update_all("position = position - 1")
      end
      # Update the column with the new position
      column.update!(position: to_position)
    end
  end

  def update_column_positions(params)
    params[:columns].each do |param|
      board_columns
        .find_by(slug: param[:id])
        .update(position: param[:position])
    end
  end
end
