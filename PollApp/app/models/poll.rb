class Poll < ActiveRecord::Base
  attr_accessible :title, :user_id
  validates :title, :user_id, :presence => true
  
  belongs_to :user
  has_many :questions, :dependent => :destroy
end
