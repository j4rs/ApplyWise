module LLM
  module GPT
    class Base
      attr_reader :client

      def initialize(model: Model::GPT4O_MINI)
        @client = OpenAI::Client.new(model: model)
      end
    end
  end
end
