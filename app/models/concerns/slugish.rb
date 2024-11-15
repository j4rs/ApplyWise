# frozen_string_literal: true

module Slugish
  extend ActiveSupport::Concern

  included do
    validates :slug, presence: true, uniqueness: true

    before_validation :generate_slug, on: :create
  end

  def generate_slug
    return if slug.present?

    self.slug = SecureRandom.uuid
  end
end
