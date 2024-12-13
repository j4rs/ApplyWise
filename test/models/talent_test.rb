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

require "test_helper"

class TalentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
