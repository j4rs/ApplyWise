# frozen_string_literal: true

module LLM
  module GPT
    class Assistant < Base
      attr_reader :assistant, :thread, :run, :parameters

      def initialize(name, instructions, tools)
        @parameters =
          self
            .class
            .base_params
            .merge(name:, instructions:, tools:)

        super()
      end

      def create_assistant
        client
          .assistants
          .create(parameters:)
      end

      def message(content, role: "user")
        @assistant = create_assistant
        @thread = client.threads.create

        # Send message to thread
        client
          .messages
          .create(thread_id: thread["id"], parameters: { role:, content: })

        # Capture run
        @run =
          client
            .runs
            .create(
              thread_id: thread["id"],
              parameters: { assistant_id: assistant["id"] },
            )

        # Wait for run to complete
        while true
          current_run =
            client
              .runs
              .retrieve(id: run["id"], thread_id: thread["id"])

          status = current_run["status"]

          Rails.logger.info("************************")
          Rails.logger.info("Run status: #{current_run}")
          Rails.logger.info("************************")

          case status
          when "queued", "in_progress", "cancelling"
            sleep 1 # Wait one second and poll again
          when "completed"
            break # Exit loop and report result to user
          when "requires_action"
            handle_tool_calls(current_run)
          when "cancelled", "failed", "expired"
            raise "Run failed: #{run["last_error"].inspect}"
          else
            raise "Unknown status response: #{status}"
          end

          sleep 1
        end
      end

      def handle_tool_calls(current_run)
        tools_to_call = current_run.dig("required_action", "submit_tool_outputs", "tool_calls")

        tool_outputs = tools_to_call.map do |tool|
          # Call the functions based on the tool's name
          function_name = tool.dig("function", "name")
          arguments =
            JSON.parse(
              tool.dig("function", "arguments"),
              { symbolize_names: true },
            )

          output = send(function_name, arguments).to_s

          {
            tool_call_id: tool["id"],
            output:
          }
        end

        client
          .runs
          .submit_tool_outputs(
            thread_id: thread["id"],
            run_id: run["id"],
            parameters: { tool_outputs: }
          )
      end
    end
  end
end
