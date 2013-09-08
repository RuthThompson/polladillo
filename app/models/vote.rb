class Vote < ActiveRecord::Base
  attr_accessible :answer_id
  validates :answer_id, :presence => true
  validates_presence_of :answer
    belongs_to :answer, :inverse_of => :votes
  has_one :question, :through => :answer
  has_one :poll, :through => :question
  
end
