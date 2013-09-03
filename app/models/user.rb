require 'bcrypt'
class User < ActiveRecord::Base
  attr_accessible :password_hash, :session_token, :username, :email, :password
  validates :session_token, :password_hash, :username, :email, :presence => true
  validates :email, :uniqueness => true
  before_validation :ensure_session_token
  
  
  has_many :polls, :dependent => :destroy
  has_many :questions, :through => :polls
  has_many :answers, :through => :questions
  
  include BCrypt
  
  def self.authenticate(email, password)
    user = User.find_by_email(email)
    if user && user.password == password
      return user
    end
  end
  
  def password
    @password ||= Password.new(password_hash)
  end
  
  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def update_session_token
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end
  
  def as_json(opts)
    opts[:only] = ["username", "id"]
    super(opts)
  end
  
  private
  
  def generate_session_token
    SecureRandom::urlsafe_base64(31)
  end
  
  def ensure_session_token
    return unless self.session_token.nil?
    self.session_token = generate_session_token
  end
  
end
