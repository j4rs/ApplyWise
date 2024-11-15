class CreateBoards < ActiveRecord::Migration[8.0]
  def change
    create_table :boards do |t|
      t.integer :partition_id, null: false, index: true

      t.string :purpose, null: false, default: "jobs"
      t.string :slug, null: false, index: { unique: true }
      t.belongs_to :talent, null: false, foreign_key: true

      t.timestamps
    end

    add_index :boards, [ :partition_id, :slug ]
    add_index :boards, [ :talent_id, :purpose ], unique: true
  end
end
