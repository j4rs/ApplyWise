module Partionable
  extend ActiveSupport::Concern

  included do
    belongs_to :partition, class_name: "Talent"

    default_scope do
      if Current.partition.nil?
        self
      else
        where(partition: Current.partition)
      end
    end

    before_validation :set_partition, on: :create
  end

  def set_partition
    return if partition

    self.partition = Current.partition
  end
end
