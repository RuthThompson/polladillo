class UsersController < ApplicationController
  
  def create
    @user = User.new({ #todo -- find out why this has to be written this way-- it shouldn't have to be.  
      :email => params[:user][:email],
      :username => params[:user][:username],
      :password => params[:user][:password]
    })
    if @user.save!
      login(@user)
      render :json => @user
    else
      render :json => @user.errors.full_messages
    end
  end
  
  def edit
    
  end
  
  def destroy
    current_user.destroy!
    render :json => "user destroyed"
  end
  
end
