# frozen_string_literal: true

class CreateContactsJobs < ActiveRecord::Migration[8.0]
  def change
    create_table :contacts_jobs do |t|
      t.references :contact, null: false, foreign_key: true
      t.references :job, null: false, foreign_key: true

      t.timestamps
    end

    add_index :contacts_jobs, [ :contact_id, :job_id ], unique: true
  end
end
