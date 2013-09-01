class PollsController < ApplicationController
  #before_filter :require_login
  def index
    @polls = current_user.polls.includes(:questions => [:answers])
  end
  
  def show
    @poll = Poll.find(params[:id])
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
  
  def edit
    
  end
  
  def destroy
    
  end
  
end
