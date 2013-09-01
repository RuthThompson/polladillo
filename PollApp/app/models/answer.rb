class Answer < ActiveRecord::Base
  attr_accessible :question_id, :value
  validates :value, :presence => true
  validates_presence_of :question
  
  has_many :votes, :dependent => :destroy
  belongs_to :question, :inverse_of => :answers
  has_one :user, :through => :question
  
  
end
