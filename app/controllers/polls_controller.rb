class PollsController < ApplicationController
  #before_filter :require_login
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
  
  def update
      @poll = Poll.includes(:questions => [:answers => [:votes]]).find(params[:id])
      @poll.assign_attributes(params[:poll])
      @poll.user_id = current_user.id
      if @poll.save
        render :show
      else
        render :json => @poll.errors.full_messages, :status => 422
      end
  end
  
  def destroy
    
  end
  
end
