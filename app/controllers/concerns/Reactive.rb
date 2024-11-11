# frozen_string_literal: true

module Reactive
  extend ActiveSupport::Concern

  included do
    before_action :render_react_app
  end

  private def render_react_app
    return unless request.format.html?
    return if request.xhr?

    render "react/app"
  end
end
