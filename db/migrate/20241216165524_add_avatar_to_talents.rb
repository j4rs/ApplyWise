class AddAvatarToTalents < ActiveRecord::Migration[8.0]
  def change
    # No need to add columns for images, ActiveStorage does this automatically
    # You can leave the migration file empty, as we don't need any new columns here
  end
end
