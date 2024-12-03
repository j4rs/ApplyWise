class RemoveTalentIdAndPurposeIndexFromBoards < ActiveRecord::Migration[8.0]
  def change
    remove_index :boards, [ :talent_id, :purpose ]
  end
end
