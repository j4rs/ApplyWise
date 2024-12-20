# frozen_string_literal: true


# == Schema Information
#
# Table name: notifications
#
#  id           :bigint           not null, primary key
#  archived     :boolean
#  body         :text
#  read_at      :datetime
#  slug         :string           not null
#  subject      :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  partition_id :integer          not null
#  talent_id    :bigint
#
# Indexes
#
#  index_notifications_on_partition_id  (partition_id)
#  index_notifications_on_slug          (slug)
#  index_notifications_on_talent_id     (talent_id)
#
class Notification < ApplicationRecord
  include Partionable
  belongs_to :talent

  after_create_commit :broadcast_notification

  def broadcast_notification
    notification = {
      subject:,
      body:,
      read_at:
    }

    ActionCable
      .server
      .broadcast("notification_channel_#{talent.slug}", notification)
  end
end
