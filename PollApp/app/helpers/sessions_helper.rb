module SessionsHelper
  
  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end
  
  def logged_in?
    !!current_user
  end
  
  def login(user)
    session[:token] = user.update_session_token
  end
  
  def logout
    if current_user
      current_user.update_session_token
      session[:token] = nil
    end
  end
  
  def require_login
    if !logged_in?
      redirect_to new_session_url
    end
  end
  
end
