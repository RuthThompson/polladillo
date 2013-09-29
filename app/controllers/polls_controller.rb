class PollsController < ApplicationController
  before_filter :require_login, :except => :show
  before_filter :not_for_guests, :only => :email
  
  def index
    @polls = current_user.polls.includes(:questions => [:answers => [:votes]])
  end
  
  def show
    @poll = Poll.includes(:questions => [:answers => [:votes]]).find(params[:id])
  end
  
  def create
    @poll = Poll.new(params[:poll])
    @poll.user_id = current_user.id
    if @poll.save
      render :show
    else
      render :json => @poll.errors.full_messages, :status => 422
    end
  end
  
  def email
    @poll = Poll.find_by_id_and_user_id(params[:emails][:poll_id], current_user.id)
    if @poll && params[:emails][:friend_emails]
      friend_emails = params[:emails][:friend_emails].split(",").map(&:strip).first(10)
      FriendMailer.friend_email(@poll, friend_emails).deliver!
      render :nothing => true
    else
      render :nothing => true, :status => 422
    end
  end
  
  def update
      @poll = Poll.includes(:questions => [:answers => [:votes]]).find(params[:id])
      if @poll.user_id == current_user.id
        @poll.assign_attributes(params[:poll])
      end
      if @poll.save
        render :show
      else
        render :json => @poll.errors.full_messages, :status => 422
      end
  end
  
  def destroy
    @poll = Poll.find_by_id_and_user_id(params[:id], current_user.id)
    @poll.destroy
    render :nothing => true
  end
  
end
