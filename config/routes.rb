Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  # In development, mount MissionControl::Jobs::Engine at /active_jobs
  # Username: admin
  # password: ssoQ8oG1Y1mLWQNid6hUBTrZSNnnfcbFn1aThCQ9S8aUQA5gLPEaNNqNrnzeCr2x
  mount MissionControl::Jobs::Engine, at: "/active_jobs"
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.local?

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

  resources :talents, only: %i[ update ]

  scope module: :dashboard do
    resource :dashboard, only: %i[ show ], controller: :dashboard do
      scope module: :inbox do
        resource :inbox
      end

      scope module: :board do
        resources :boards, only: %i[ create index show update destroy ] do
          resources :jobs, only: %i[ show ]
          scope module: :column do
            resources :columns, only: %i[ create update destroy ] do
              resource :move, only: %i[ update ], controller: :move
            end
          end
          resource :collapse, only: %i[ update ], controller: :collapse
        end
      end

      namespace :board do
        resources :cards, only: %i[ create destroy update ]
        resources :jobs, only: %i[ update destroy ]
      end
    end
  end
end
