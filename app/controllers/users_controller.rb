class UsersController < ApplicationController
  before_filter :require_login, :except => :create

  def create
    @user = User.new(params[:user])
    if @user.save
      login(@user)
      render :json => @user
    else
      render :json => @user.errors.full_messages, :status => 422
    end
  end
  
  def update
    @user = current_user
    @user.assign_attributes(params[:user])
    if @user.save
      login(@user)
      render :json => @user
    else
      render :json => @user.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    current_user.destroy!
    render :nothing => true
  end
  
end
