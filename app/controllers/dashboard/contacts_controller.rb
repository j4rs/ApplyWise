# frozen_string_literal: true

module Dashboard
  class ContactsController < PrivateController
    include Reactive
    skip_forgery_protection only: %i[ create update destroy ]
    before_action :set_contact, only: %i[ show update destroy ]
    before_action :set_job, only: %i[ create ]

    # GET /dashboard/contacts
    def index
      @contacts = current_talent.contacts.includes(:jobs)
    end

    # GET /dashboard/contacts/:id
    def show
      render json: @contact
    end

    # POST /dashboard/contacts
    def create
      ApplicationRecord.transaction do
        @contact = Contact.create!(contact_params)
        @contact.jobs << @job if @job
      end
    end

    # PATCH /dashboard/contacts/:id
    def update
      @contact.update!(contact_params)
    end

    # DELETE /dashboard/contacts/:id
    def destroy
      @contact.destroy
      head :no_content
    end

    private

    def set_contact
      @contact = current_talent.contacts.find_by(slug: params[:id])
    end

    def contact_params
      params.require(:contact).permit(:name, :email, :phone, :role, :profile_url)
    end

    def set_job
      return unless params[:job_id]
      @job ||= Job.find_by(slug: params[:job_id])
    end
  end
end
