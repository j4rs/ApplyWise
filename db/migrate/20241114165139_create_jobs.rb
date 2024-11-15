class CreateJobs < ActiveRecord::Migration[8.0]
  def change
    create_table :jobs do |t|
      t.integer :partition_id, null: false, index: true

      t.string :slug, null: false, index: { unique: true }
      t.string :role, null: false

      t.string :company_name
      t.text :description
      t.string :url
      t.string :color
      t.string :image

      t.timestamps
    end

    add_index :jobs, [ :partition_id, :slug ]
  end
end
