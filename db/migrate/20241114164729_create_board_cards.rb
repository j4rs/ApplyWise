class CreateBoardCards < ActiveRecord::Migration[8.0]
  def change
    create_table :board_cards do |t|
      t.integer :partition_id, null: false, index: true

      t.string :slug, null: false, index: { unique: true }
      t.integer :position, null: false

      t.belongs_to :board_column, null: false, foreign_key: true
      t.belongs_to :job, null: false

      t.timestamps
    end

    add_index :board_cards, [ :partition_id, :slug ]
    add_index :board_cards, [ :board_column_id, :position ], unique: true
  end
end
