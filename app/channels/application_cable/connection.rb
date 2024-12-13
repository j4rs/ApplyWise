# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_talent_slug

    def connect
      self.current_talent_slug = find_verified_talent_slug
    end

    private

    def find_verified_talent_slug
      verified_talent_slug =
        Talent
          .find_by(id: request.session[:current_talent_id])
          &.slug
      reject_unauthorized_connection unless verified_talent_slug
      verified_talent_slug
    end
  end
end
