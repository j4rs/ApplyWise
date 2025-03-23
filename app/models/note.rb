# == Schema Information
#
# Table name: notes
#
#  id           :bigint           not null, primary key
#  content      :text             not null
#  slug         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  job_id       :bigint           not null
#  partition_id :integer          not null
#
# Indexes
#
#  index_notes_on_job_id                 (job_id)
#  index_notes_on_partition_id           (partition_id)
#  index_notes_on_partition_id_and_slug  (partition_id,slug)
#  index_notes_on_slug                   (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (job_id => jobs.id)
#
class Note < ApplicationRecord
  include Partionable

  belongs_to :job

  validates :content, presence: true
end
