class CreateIpAddresses < ActiveRecord::Migration
  def change
    create_table :ip_addresses do |t|
      t.integer :question_id
      t.string :ip_address

      t.timestamps
    end
    add_index :ip_addresses, [:question_id, :ip_address]
  end
end
