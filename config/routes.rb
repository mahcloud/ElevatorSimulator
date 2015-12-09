Rails.application.routes.draw do
  root to: 'buildings#index'

  resources :buildings, only: [:index, :new, :show, :create]
  resources :elevators, only: [:create]
end
