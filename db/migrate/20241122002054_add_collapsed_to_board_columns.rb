class AddCollapsedToBoardColumns < ActiveRecord::Migration[8.0]
  def change
    add_column :board_columns, :collapsed, :boolean, default: false
  end
end
