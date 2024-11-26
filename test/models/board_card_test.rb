# == Schema Information
#
# Table name: board_cards
#
#  id              :bigint           not null, primary key
#  position        :integer          not null
#  slug            :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  board_column_id :bigint           not null
#  job_id          :bigint           not null
#  partition_id    :integer          not null
#
# Indexes
#
#  index_board_cards_on_board_column_id        (board_column_id)
#  index_board_cards_on_job_id                 (job_id)
#  index_board_cards_on_partition_id           (partition_id)
#  index_board_cards_on_partition_id_and_slug  (partition_id,slug)
#  index_board_cards_on_slug                   (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (board_column_id => board_columns.id)
#

require "test_helper"

class BoardCardTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
