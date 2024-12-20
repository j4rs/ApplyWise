# frozen_string_literal: true

require "open-uri"

class PdfReaderJob < ApplicationJob
  queue_as :default

  discard_on ActiveRecord::RecordNotFound

  def perform(text_pdf)
    reader = PDF::Reader.new(URI.open(text_pdf.attachment.url))

    attrs = {
      text: reader.pages.map(&:text).join("\n"),
      page_count: reader.page_count,
      pdf_version: reader.pdf_version,
      info: reader.info,
      metadata: reader.metadata
    }

    text_pdf.update!(attrs)
  end
end
