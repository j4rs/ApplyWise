# == Schema Information
#
# Table name: talents
#
#  id          :bigint           not null, primary key
#  country     :string
#  description :text
#  email       :string           not null
#  first_name  :string
#  language    :string
#  last_name   :string
#  preferences :jsonb
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_talents_on_slug  (slug) UNIQUE
#

class Talent < ApplicationRecord
  has_many :boards, dependent: :destroy
  has_many_attached :resumes

  store_accessor :preferences,
                 :last_seen_board_id,
                 :is_sidebar_collapsed,
                 :jobs_layout

  after_create :create_board!

  private

  def create_board!
    Current.partition = self

    Board.create_with_initial_columns!(talent: self)
  end
end
