# frozen_string_literal: true

class FlashChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.info "⭐️ Subscribing to stream: flash_channel_#{current_talent_slug}"
    stream_from "flash_channel_#{current_talent_slug}"
  end

  def unsubscribed
    Rails.logger.info "⭐️ Unsubscribing from stream: flash_channel_#{current_talent_slug}"
  end
end
