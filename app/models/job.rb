class Job < ApplicationRecord
  include Partionable

  def header = role
  def subheader = company_name
end
