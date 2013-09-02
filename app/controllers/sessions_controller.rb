class SessionsController < ApplicationController
  
  def new
    render new
  end
  
  def create
    @user = User.authenticate(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] ||= []
      flash[:errors] << "Incorrect email or password"
      redirect_to new_session_url
    end
  end
  
  def destroy
    logout
    redirect_to new_session_url
  end
end
