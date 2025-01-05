class CreateTailoredResumes < ActiveRecord::Migration[8.0]
  def change
    create_table :tailored_resumes do |t|
      t.integer :partition_id, null: false, index: true
      t.string :slug, null: false, index: { unique: true }

      t.belongs_to :talent
      t.belongs_to :job

      t.jsonb :build

      t.timestamps
    end
  end
end
