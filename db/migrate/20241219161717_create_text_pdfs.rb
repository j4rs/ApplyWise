class CreateTextPdfs < ActiveRecord::Migration[8.0]
  def change
    create_table :text_pdfs do |t|
      t.integer :partition_id, null: false, index: true
      t.string :slug, null: false

      t.belongs_to :talent
      t.belongs_to :attachment

      t.string :doc_purpose, default: "resume"
      t.text :text

      t.string :pdf_version
      t.jsonb :info
      t.jsonb :metadata
      t.integer :page_count

      t.jsonb :build

      t.timestamps
    end
  end
end
