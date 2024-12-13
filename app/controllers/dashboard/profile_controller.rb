# frozen_string_literal: true

module Dashboard
  class ProfileController < ApplicationController
    skip_forgery_protection only: %i[ update ]
    include Reactive

    # GET /dashboard/profile
    def show; end

    # PATCH /dashboard/profile
    def update
      current_talent.update!(profile_params)
    end

    private

    def profile_params
      params
        .require(:profile)
        .permit(:first_name, :last_name, :description, :country, :language, resumes: [])
    end
  end
end
