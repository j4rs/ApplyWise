class CreateSignedMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :signed_messages do |t|
      t.string :purpose, null: false, index: true
      t.string :token, null: false, index: { unique: true }
      t.datetime :read_at

      t.timestamps
    end
  end
end
