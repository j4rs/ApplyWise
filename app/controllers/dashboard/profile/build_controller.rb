# frozen_string_literal: true

module Dashboard
  module Profile
    class BuildController < ApplicationController
      skip_forgery_protection only: %i[ update destroy ]
      include Reactive

      # GET /dashboard/profile/resume
      def show; end

      # PATCH /dashboard/profile/resume
      def update
        current_talent.update!(profile_params)
      end

      # DELETE /dashboard/profile/resume
      def destroy
        # TODO: remove resume from talent
      end

      private

      def profile_params
        params
          .require(:profile)
          .permit(resumes: [])
      end
    end
  end
end
