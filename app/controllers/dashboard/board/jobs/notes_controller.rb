# frozen_string_literal: true

module Dashboard
  module Board
    module Jobs
      class NotesController < PrivateController
        include Reactive
        skip_forgery_protection only: %i[ create update destroy ]
        before_action :set_job
        before_action :set_note, only: %i[ update destroy ]

        # POST /dashboard/board/jobs/:job_id/notes
        def create
          @note = @job.notes.create!(note_params)
        end

        # PATCH /dashboard/board/jobs/:job_id/notes/:id
        def update
          @note.update!(note_params)
        end

        # DELETE /dashboard/board/jobs/:job_id/notes/:id
        def destroy
          @note.destroy
          head :no_content
        end

        private

        def set_job
          @job = ::Job.find_by!(slug: params[:job_id])
        end

        def set_note
          @note = @job.notes.find_by!(slug: params[:id])
        end

        def note_params
          params.require(:note).permit(:content)
        end
      end
    end
  end
end
