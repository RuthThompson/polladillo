class RemoveNotNullFromPasswordHash < ActiveRecord::Migration
  def change
    change_column :users, :password_hash, :string, :null => true
  end
end
