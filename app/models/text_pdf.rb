# == Schema Information
#
# Table name: text_pdfs
#
#  id            :bigint           not null, primary key
#  build         :jsonb
#  doc_purpose   :string           default("resume")
#  info          :jsonb
#  metadata      :jsonb
#  page_count    :integer
#  pdf_version   :string
#  slug          :string           not null
#  text          :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  attachment_id :bigint
#  partition_id  :integer          not null
#  talent_id     :bigint
#
# Indexes
#
#  index_text_pdfs_on_attachment_id  (attachment_id)
#  index_text_pdfs_on_partition_id   (partition_id)
#  index_text_pdfs_on_slug           (slug) UNIQUE
#  index_text_pdfs_on_talent_id      (talent_id)
#
class TextPdf < ApplicationRecord
  include Partionable

  belongs_to :talent
  belongs_to :attachment,
             class_name: "ActiveStorage::Attachment"

  scope :resume, -> { where(doc_purpose: "resume") }

  after_create_commit :read_pdf

  def merge_build(new_build)
    update(build: (build || {}).merge(new_build))
  end

  private

  def read_pdf
    PdfReaderJob.perform_later(self)
  end
end
