class CreateAuthorizations < ActiveRecord::Migration
  def change
    create_table :authorizations do |t|
      t.string :provider
      t.string :uid
      t.integer :user_id
      t.string :token
      t.string :secret
      t.string :name
      t.string :link
      t.string :email

      t.timestamps
    end
    add_index :authorizations, :user_id
    add_index :authorizations, :uid
    add_index :authorizations, :email
  end
end
