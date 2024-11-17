Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  mount MissionControl::Jobs::Engine, at: "/active_jobs"
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "landing/home#index"

  resources :sessions, only: %i[ new create show destroy ] do
    collection do
      delete :destroy
    end
  end

  scope module: :dashboard do
    resource :dashboard, only: %i[ show ] do
      scope module: :inbox do
        resource :inbox
      end
      scope module: :board do
        resource :board, only: %i[ show update ], controller: :board do
          resources :jobs, only: %i[ update destroy ]
          resources :cards, only: %i[ create destroy update ]
        end
      end
    end
  end
end
