# == Schema Information
#
# Table name: signed_messages
#
#  id         :bigint           not null, primary key
#  purpose    :string           not null
#  read_at    :datetime
#  slug       :string           not null
#  token      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_signed_messages_on_purpose  (purpose)
#  index_signed_messages_on_slug     (slug) UNIQUE
#  index_signed_messages_on_token    (token) UNIQUE
#

class SignedMessage < ApplicationRecord
  PURPOSES = %w[sign_in default]

  validates :token, presence: true
  validates :purpose, presence: true, inclusion: { in: PURPOSES }

  scope :unused, -> { where(read_at: nil) }

  validates :token, uniqueness: true

  def self.generate!(content, purpose: "signed_messages", expires_at: 15.minutes.from_now)
    token =
      Rails
        .application
        .message_verifier(purpose.to_s)
        .generate(content, expires_at:)

    create!(purpose: purpose.to_s, token:)
  end

  def self.use!(token)
    message = find_by!(token:)
    # raise "Token already used" if message.read_at?

    content =
      Rails
        .application
        .message_verifier(message.purpose.to_s)
        .verify(message.token)

    message.update(read_at: Time.current)
    content
  end
end
