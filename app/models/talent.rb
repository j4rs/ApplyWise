class Talent < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_one :job_board, -> { jobs }, class_name: "Board"

  after_create :create_board!

  private

  def create_board!
    Current.partition = self

    Board.create_with_initial_columns!(talent: self)
  end
end
