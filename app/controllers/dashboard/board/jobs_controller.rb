# frozen_string_literal: true

module Dashboard
  module Board
    class JobsController < ApplicationController
      include Reactive

      skip_forgery_protection only: %i[ update]
      before_action :set_job, only: [ :update ]

      # GET /dashboard/board/:board_id/jobs/:id
      def show
        @job = Job.find_by!(slug: params[:id])
      end

      # PATCH /dashboard/board/:board_id/jobs/:id
      def update
        @job.update(job_params)
        render :show
      end

      private

      def set_job
        @job = Job.find_by!(slug: params[:id])
      end

      def job_params
        params
          .require(:job)
          .permit(:role, :description, :company_name, :url, :color)
      end
    end
  end
end
