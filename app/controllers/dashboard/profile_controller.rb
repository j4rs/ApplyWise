# frozen_string_literal: true

module Dashboard
  class ProfileController < ApplicationController
    skip_forgery_protection only: %i[ update ]
    after_action :broadcast_profile_update, only: %i[ update ]

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

    def broadcast_profile_update
      # ActionCable
      #   .server
      #   .broadcast("flash_channel_#{current_talent.slug}", { title: "Profile updated successfully", subtitle: "Your profile has been updated successfully" })
    end
  end
end
