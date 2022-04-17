Rails.application.routes.draw do
  resources :dreams, only: %i[index create update destroy]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
