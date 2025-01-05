# == Schema Information
#
# Table name: tailored_resumes
#
#  id           :bigint           not null, primary key
#  build        :jsonb
#  slug         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  job_id       :bigint
#  partition_id :integer          not null
#  talent_id    :bigint
#
# Indexes
#
#  index_tailored_resumes_on_job_id        (job_id)
#  index_tailored_resumes_on_partition_id  (partition_id)
#  index_tailored_resumes_on_slug          (slug) UNIQUE
#  index_tailored_resumes_on_talent_id     (talent_id)
#
class TailoredResume < ApplicationRecord
  include Partionable

  belongs_to :talent
  belongs_to :job

  def merge_build(new_build)
    update(build: (build || {}).merge(new_build))
  end
end
