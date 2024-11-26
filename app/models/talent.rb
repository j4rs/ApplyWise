# == Schema Information
#
# Table name: talents
#
#  id         :bigint           not null, primary key
#  email      :string           not null
#  first_name :string
#  last_name  :string
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_talents_on_slug  (slug) UNIQUE
#

class Talent < ApplicationRecord
  has_many :boards, dependent: :destroy

  after_create :create_board!

  private

  def create_board!
    Current.partition = self

    Board.create_with_initial_columns!(talent: self)
  end
end
