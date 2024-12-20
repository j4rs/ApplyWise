module LLM
  module GPT
    class Base
      attr_reader :client, :role

      def self.base_params
        {
          model: Model::GPT4O
        }
      end

      def initialize(model = Model::GPT4O_MINI)
        params =
          self
            .class
            .base_params
            .merge(model:)

        @client = OpenAI::Client.new(params) do |f|
          if Rails.env.local?
            f.response :logger, Logger.new($stdout), bodies: true
          end
        end
      end
    end
  end
end
