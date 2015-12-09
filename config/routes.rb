Rails.application.routes.draw do
  root to: 'buildings#index'

  resources :buildings, only: [:index, :new, :show, :create]
  resources :elevators, only: [:create]

  namespace :api do
    resources :elevators, only: [:update]
    resources :floors, only: [:create]
  end
end
