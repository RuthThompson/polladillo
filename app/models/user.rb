require 'bcrypt'
class User < ActiveRecord::Base
  attr_accessible :password_hash, :session_token, :username, :email,
                  :password, :authorizations_attributes, :guest
  validates :session_token, :username, :email, :presence => true
  validates :email, :uniqueness => true
  validate :ensure_password_length
  validates :email, email_format: { message: "must be an email address" }
  before_validation :ensure_session_token
  before_validation :downcase_email
  has_many :authorizations, :dependent => :destroy
  
  has_many :polls, :dependent => :destroy
  has_many :questions, :through => :polls
  has_many :answers, :through => :questions
  
  accepts_nested_attributes_for :authorizations
  
  scope :guest, -> { where(guest: true) }
  scope :expired_guest, -> { guest.where("created_at < ? ", 3.hours.ago)}
  
  include BCrypt
  
  def self.authenticate_by_email_and_password(email, password)
    user = User.find_by_email(email)
    if user && user.password == password
      return user
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
      user = User.new(  
        :username => name, 
        :email => email, 
        :password => SecureRandom::urlsafe_base64(15),
        :authorizations_attributes => [{
          :provider => "facebook",
          :uid => uid, 
          :name => name, 
          :email => email,
        }]
      );
      user.save
    end
    return user
  end
  
  def self.new_guest
    User.expired_guest.each(&:destroy); #heroku charges for workers -- this is almost the same.  
        
    user = self.create({ 
      :guest => true, 
      :username => 'Guest', 
      :password => SecureRandom::urlsafe_base64(15), 
      :email => "guest@#{SecureRandom::hex(10)}.com" 
      })
      
    poll = Poll.create({
      :user_id => user.id,
      :title => "Sample Poll", 
      :questions_attributes => [{
        :value => "How do you use Polladillo?",
        :answers_attributes => [
          {:value => "To poll my students during lecture"}, 
          {:value => "To poll my friends about social events"}, 
          {:value => "Other"}
        ]
      }]
      }) 
      
    poll.questions.includes(:answers).each do |question|
      question.answers.each do |answer|
        Vote.create({ :answer_id => answer.id })
      end
    end
    user
  end

  def password
    @password ||= Password.new(password_hash)
  end
  
  def password=(new_password)
    @validation_pass = new_password
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
  
  def ensure_password_length
    if @validation_pass && @validation_pass.length < 5
       self.errors.add(:password, 'must be at least six characters')
    end
  end
  
  def generate_session_token
    SecureRandom::urlsafe_base64(31)
  end
  
  def ensure_session_token
    return unless self.session_token.nil?
    self.session_token = generate_session_token
  end
  
  def downcase_email
    unless self.email.nil?
      self.email = self.email.downcase
    end
  end
  
end
