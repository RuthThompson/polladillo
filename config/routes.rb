PollApp::Application.routes.draw do
  resources :users
  resources :polls do
    member do
      post 'email', to: 'polls#email'
    end
    resources :votes, :only => [:index]
  end
  resources :votes, :only => [:create]
  resource :session, :only => [:create, :destroy, :new]
  
  get '/sms-quickstart', to: 'votes#from_text'
  
  get '/auth/:provider/callback', to: 'sessions#o_create'
  root :to => "root#root"
end
