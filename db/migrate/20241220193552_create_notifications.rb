class CreateNotifications < ActiveRecord::Migration[8.0]
  def change
    create_table :notifications do |t|
      t.integer :partition_id, null: false, index: true
      t.string :slug, null: false, index: true

      t.belongs_to :talent

      t.timestamp :read_at
      t.boolean :archived

      t.string :subject
      t.text :body

      t.timestamps
    end
  end
end
