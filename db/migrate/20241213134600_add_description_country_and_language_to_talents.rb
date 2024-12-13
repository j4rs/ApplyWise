class AddDescriptionCountryAndLanguageToTalents < ActiveRecord::Migration[8.0]
  def change
    add_column :talents, :description, :text
    add_column :talents, :country, :string
    add_column :talents, :language, :string
  end
end
