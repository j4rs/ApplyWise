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
require "test_helper"

class BoardTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
