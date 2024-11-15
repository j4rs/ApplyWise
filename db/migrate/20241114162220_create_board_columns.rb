class CreateBoardColumns < ActiveRecord::Migration[8.0]
  def change
    create_table :board_columns do |t|
      t.integer :partition_id, null: false, index: true

      t.string :slug, null: false, index: { unique: true }
      t.string :name, null: false

      t.integer :position, null: false
      t.string :color

      t.belongs_to :board, null: false, foreign_key: true

      t.timestamps
    end

    add_index :board_columns, [ :partition_id, :slug ]
  end
end
