class Question < ActiveRecord::Base
  attr_accessible :poll_id, :value, :answers_attributes
  validates :value, :presence => true
  validates_presence_of :poll
  
  belongs_to :poll, :inverse_of => :questions
  has_many :ip_addresses
  has_many :phone_numbers
  has_one :user, :through => :poll
  has_many :answers, :dependent => :destroy, :inverse_of => :question
  has_many :votes, :through => :answers
  
  accepts_nested_attributes_for :answers, :allow_destroy => true
end
