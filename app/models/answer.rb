class Answer < ActiveRecord::Base
  attr_accessible :question_id, :value
  validates :value, :presence => true
  validates_presence_of :question
  
  has_many :votes, :dependent => :destroy, :inverse_of => :answer
  belongs_to :question, :inverse_of => :answers
  has_one :poll, :through => :question
  has_one :user, :through => :poll
  has_many :ip_addresses, :through => :question
  has_many :phone_numbers, :through => :question
  
end
