PollApp::Application.routes.draw do
  resources :users
  resources :polls
  resource :session, :only => [:create, :destroy, :new]
  
  root :to => "root#root"
end
