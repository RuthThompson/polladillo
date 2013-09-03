class SessionsController < ApplicationController
  
  def new
    render new
  end
  
  def create
    p params[:user]
    @user = User.authenticate(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render :json => @user
    else
      errors = {errors => ["Incorrect email or password"]}
      render :json => errors, :status => 422 # send the errors as a hash
    end
  end
  
  def destroy
    logout
    render :nothing => true
  end
end
