# == Schema Information
#
# Table name: contacts
#
#  id           :bigint           not null, primary key
#  partition_id :integer          not null
#  slug         :string           not null
#  name         :string           not null
#  email        :string
#  phone        :string
#  role         :string
#  profile_url  :string
#  talent_id    :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_contacts_on_partition_id            (partition_id)
#  index_contacts_on_partition_id_and_slug   (partition_id,slug)
#  index_contacts_on_slug                    (slug) UNIQUE
#  index_contacts_on_talent_id               (talent_id)
#
# Foreign Keys
#
#  fk_rails_...  (talent_id => talents.id)
#
class Contact < ApplicationRecord
  include Partionable

  has_and_belongs_to_many :jobs

  validates :name, presence: true
end
