class Poll < ActiveRecord::Base
  attr_accessible :title, :user_id, :questions_attributes
  validates :title, :user_id, :presence => true
  
  belongs_to :user
  has_many :questions, :dependent => :destroy, :inverse_of => :poll
  
  accepts_nested_attributes_for :questions
end
