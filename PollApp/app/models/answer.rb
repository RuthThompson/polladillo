class Answer < ActiveRecord::Base
  attr_accessible :question_id, :value
  validates :question_id, :value, :presence => true
  
  has_many :votes, :dependent => :destroy
  
  
end
