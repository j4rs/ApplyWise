class ApplicationRecord < ActiveRecord::Base
  include Slugish

  primary_abstract_class
end
