# frozen_string_literal: true

class NotificationChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.info "⭐️ Subscribing to stream: notifications_channel_#{current_talent_slug}"
    stream_from "notification_channel_#{current_talent_slug}"
  end

  def unsubscribed
    Rails.logger.info "⭐️ Unsubscribing from stream: notifications_channel_#{current_talent_slug}"
  end
end
