class AddPreferencesToTalents < ActiveRecord::Migration[8.0]
  def change
    add_column :talents, :preferences, :jsonb
  end
end
