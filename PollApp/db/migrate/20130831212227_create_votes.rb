class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :answer_id, :null => false
      t.integer :voter_id

      t.timestamps
    end
    add_index :votes, :answer_id
  end
end
