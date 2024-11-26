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
require "test_helper"

class BoardColumnTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
