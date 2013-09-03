class SessionsController < ApplicationController
  
  def new
    render new
  end
  
  def create
    @user = User.authenticate_by_email_and_password(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render :json => @user
    else
      errors = {errors => ["Incorrect email or password"]}
      render :json => errors, :status => 422 # send the errors as a hash
    end
  end
  
  def o_create
    @user = User.authenticate_or_create_by_facebook(request.env['omniauth.auth'])
    login(@user)
    render :json => @user
  end
  
  def destroy
    logout
    render :nothing => true
  end
end
