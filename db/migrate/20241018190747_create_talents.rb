class CreateTalents < ActiveRecord::Migration[8.0]
  def change
    create_table :talents do |t|
      t.string :slug, null: false, index: { unique: true }
      t.string :email, null: false
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
