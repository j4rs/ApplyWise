# frozen_string_literal: true

class TalentsController < ApplicationController
  before_action :authenticate_talent!
  skip_forgery_protection only: %i[ update ]

  # PATCH /talents
  def update
    Current.talent.update!(talent_params)

    head :no_content
  end

  private def talent_params
    params.require(:talent).permit(:preferences)
  end
end
