# frozen_string_literal: true

class CreateContacts < ActiveRecord::Migration[8.0]
  def change
    create_table :contacts do |t|
      t.integer :partition_id, null: false
      t.string :slug, null: false
      t.string :name, null: false
      t.string :email
      t.string :phone
      t.string :role
      t.string :profile_url

      t.timestamps
    end
    add_index :contacts, :partition_id
    add_index :contacts, :slug, unique: true
    add_index :contacts, [ :partition_id, :slug ]
  end
end
