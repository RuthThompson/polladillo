class Question < ActiveRecord::Base
  attr_accessible :poll_id, :value
  validates :poll_id, :value, :presence => true
  
  belongs_to :poll
  has_many :votes, :dependent => :destroy
end
