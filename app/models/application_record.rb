# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  include Slugish

  primary_abstract_class
end
