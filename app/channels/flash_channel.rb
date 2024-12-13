# frozen_string_literal: true

class FlashChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.info "⭐️ Subscribing to stream: #{current_talent_slug}"
    stream_from "flash_channel_#{current_talent_slug}"
  end

  def unsubscribed
    Rails.logger.info "⭐️ Unsubscribing from stream: #{current_talent_slug}"
    # No need to explicitly stop_stream here
  end

  def receive(data)
    Rails.logger.info "⭐️ Received data: #{data}"
    # Echo the message back through the stream
    ActionCable.server.broadcast(
      current_talent_slug,
      {
        message: data["message"],
        type: "echo",
        received_at: Time.current
      }
    )
  end
end
