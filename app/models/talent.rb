# == Schema Information
#
# Table name: talents
#
#  id          :bigint           not null, primary key
#  country     :string
#  description :text
#  email       :string           not null
#  first_name  :string
#  language    :string
#  last_name   :string
#  preferences :jsonb
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_talents_on_slug  (slug) UNIQUE
#

class Talent < ApplicationRecord
  has_many :boards, dependent: :destroy

  has_many_attached :resumes, service: :amazon
  has_one_attached :avatar, service: :amazon

  has_many :text_pdfs, dependent: :destroy
  has_one :last_text_pdf, -> { resume.order(created_at: :desc) },
          class_name: "TextPdf"

  store_accessor :preferences,
                 :last_seen_board_id,
                 :is_sidebar_collapsed,
                 :jobs_layout

  after_create :create_board!
  after_save_commit :create_text_pdfs

  private

  def create_board!
    Current.partition = self

    Board.create_with_initial_columns!(talent: self)
  end

  # clean up text pdf
  def create_text_pdfs
    resumes.each do |attachment|
      next if text_pdfs.where(attachment:).exists?
      text_pdfs.create!(attachment:)
    end
  end
end
