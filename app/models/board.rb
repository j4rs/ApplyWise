class Board < ApplicationRecord
  include Partionable

  belongs_to :talent, inverse_of: :boards
  has_many :board_columns, -> { ordered }, dependent: :destroy

  scope :jobs, -> { where(purpose: :jobs) }

  def self.create_with_initial_columns!(attributes = {})
    create!(attributes).tap do |board|
      BoardColumn.create_defaults!(board:)
    end
  end

  def update_column_positions(params)
    params[:columns].each do |param|
      columns
        .find_by(slug: param[:id])
        .update(position: param[:position])
    end
  end
end
