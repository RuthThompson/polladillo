require 'bcrypt'
class User < ActiveRecord::Base
  attr_accessible :password_hash, :session_token, :username, :email, :password, :authorizations_attributes
  validates :session_token, :username, :email, :presence => true
  validates :email, :uniqueness => true
  before_validation :ensure_session_token
  has_many :authorizations, :dependent => :destroy
  
  has_many :polls, :dependent => :destroy
  has_many :questions, :through => :polls
  has_many :answers, :through => :questions
  
  accepts_nested_attributes_for :authorizations
  
  include BCrypt
  
  def self.authenticate_by_email_and_password(email, password)
    unless password.nil?
      user = User.find_by_email(email)
      if user && user.password == password
        return user
      end
    end
  end
  
  def self.authenticate_or_create_by_facebook(auth_hash)
    uid = auth_hash['uid']
    email = auth_hash[:info][:email]
    name = auth_hash[:info][:name]
    
    authorization = Authorization.find_by_uid(uid)
    if authorization
      user = authorization.user
    else
      user = User.new(  :username => name, 
                        :email => email, 
                        :authorizations_attributes => [{
                          :provider => "facebook",
                          :uid => uid, 
                          :name => name, 
                          :email => email,
                        }]
                      );
    end
    return user
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
    opts[:only] = ["username", "id", "email"]
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
