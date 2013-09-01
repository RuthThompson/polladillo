PollApp::Application.routes.draw do
  resources :users do 
    resources :polls, :only => [:index]
  end
  resources :polls
  resource :session, :only => [:create, :destroy, :new]
  
  root :to => "root#root"
end
