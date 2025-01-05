# frozen_string_literal: true

module Dashboard
  module Profile
    class BasicController < ApplicationController
      skip_forgery_protection only: %i[ update ]
      after_action :broadcast_profile_update, only: %i[ update ]

      include Reactive

      # GET /dashboard/profile/basic
      def show; end

      # PATCH /dashboard/profile/basic
      def update
        current_talent.update!(profile_params)
      end

      private

      def profile_params
        params
          .require(:profile)
          .permit(:first_name, :last_name, :description, :country, :avatar, :language)
      end

      def broadcast_profile_update
        # ActionCable
        #   .server
        #   .broadcast("flash_channel_#{current_talent.slug}", { title: "Profile updated successfully", subtitle: "Your profile has been updated successfully" })
      end
    end
  end
end
