class PhoneNumber < ActiveRecord::Base
  attr_accessible :phone_number, :question_id
  belongs_to :question
end
