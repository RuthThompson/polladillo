class Vote < ActiveRecord::Base
  attr_accessible :answer_id, :voter_id
  validates :answer_id, :presence => true
  
  belongs_to :answer
end
