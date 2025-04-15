# frozen_string_literal: true

module Slugish
  extend ActiveSupport::Concern

  included do
    before_create :generate_slug
  end

  def generate_slug
    return if slug.present?

    self.slug = SecureRandom.uuid
  end
end
