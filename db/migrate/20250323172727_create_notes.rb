# frozen_string_literal: true

class CreateNotes < ActiveRecord::Migration[8.0]
  def change
    create_table :notes do |t|
      t.integer :partition_id, null: false
      t.string :slug, null: false
      t.text :content, null: false
      t.references :job, null: false, foreign_key: true

      t.timestamps
    end
    add_index :notes, :partition_id
    add_index :notes, :slug, unique: true
    add_index :notes, [ :partition_id, :slug ]
  end
end
