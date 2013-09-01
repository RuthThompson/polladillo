class Question < ActiveRecord::Base
  attr_accessible :poll_id, :value, :answers_attributes
  validates :value, :presence => true
  validates_presence_of :poll
  
  belongs_to :poll, :inverse_of => :questions
  has_one :user, :through => :poll
  has_many :answers, :dependent => :destroy, :inverse_of => :question
  
  accepts_nested_attributes_for :answers
end
