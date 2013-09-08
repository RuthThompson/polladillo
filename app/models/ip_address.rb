class IpAddress < ActiveRecord::Base
  attr_accessible :ip_address, :question_id
  belongs_to :question
end
