Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  # In development, mount MissionControl::Jobs::Engine at /active_jobs
  # Username: admin
  # password: ssoQ8oG1Y1mLWQNid6hUBTrZSNnnfcbFn1aThCQ9S8aUQA5gLPEaNNqNrnzeCr2x
  mount MissionControl::Jobs::Engine, at: "/active_jobs"
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "landing#index"

  resources :sessions, only: %i[ new create show destroy ] do
    collection do
      delete :destroy
    end
  end

  resource :talent, only: %i[ show ]

  scope module: :talents do
    resource :preferences, only: %i[ update ]
  end

  # /dashboard
  resource :dashboard, only: %i[ show ], controller: :dashboard

  namespace :dashboard do
    # /dashboard/profile
    namespace :profile do
      # /dashboard/profile/basic
      resource :basic, only: %i[ show update ], controller: :basic
      # /dashboard/profile/resume
      resource :build, only: %i[ show update destroy ], controller: :build
    end

    resources :notifications, only: %i[ index ]
    resource :support, only: %i[ show ], controller: :support

    # /dashboard/boards
    resources :boards, only: %i[ create index show update destroy ] do
      # /dashboard/boards/:board_id/columns
      scope module: :board do
        # /dashboard/boards/:board_id/columns
        resources :columns, only: %i[ create update destroy ] do
          # /dashboard/boards/:board_id/columns/:id/move
          scope module: :column do
            resource :move, only: %i[ update ], controller: :move
          end
        end
        # /dashboard/boards/:board_id/jobs/:id
        resources :jobs, only: %i[ show ] do
          # /dashboard/boards/:board_id/jobs/:id/details
          scope module: :job do
            resource :details, only: %i[ show ]
          end
        end
        # /dashboard/boards/:board_id/collapse
        resource :collapse, only: %i[ update ], controller: :collapse
      end
    end

    # The following actions don't need the board and column context
    # as everything is scoped to the partition and using slug

    # /dashboard/board
    namespace :board do
      # /dashboard/board/cards
      resources :cards, only: %i[ create destroy update ]
      # /dashboard/board/jobs
      resources :jobs, only: %i[ update destroy ] do
        # /dashboard/board/jobs/:job_id/notes
        scope module: :jobs do
          resources :notes, only: %i[ index show create update destroy ]
        end
      end
    end

    # /dashboard/contacts
    resources :contacts, only: %i[ create update destroy ]
  end
end
