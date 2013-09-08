class CreatePhoneNumbers < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.integer :question_id
      t.string :phone_number

      t.timestamps
    end
     add_index :phone_numbers, [:question_id, :phone_number]
  end
 
end
