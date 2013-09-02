PollApp::Application.routes.draw do
  resources :users
  resources :polls do
    resources :votes, :only => [:index]
  end
  resources :votes, :only => [:create]
  resource :session, :only => [:create, :destroy, :new]
  
  root :to => "root#root"
end
