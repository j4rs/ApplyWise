# == Schema Information
#
# Table name: jobs
#
#  id           :bigint           not null, primary key
#  color        :string
#  company_name :string
#  description  :text
#  image        :string
#  role         :string           not null
#  slug         :string           not null
#  url          :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  partition_id :integer          not null
#
# Indexes
#
#  index_jobs_on_partition_id           (partition_id)
#  index_jobs_on_partition_id_and_slug  (partition_id,slug)
#  index_jobs_on_slug                   (slug) UNIQUE
#

class Job < ApplicationRecord
  include Partionable

  has_many :tailored_resumes, dependent: :destroy
end
