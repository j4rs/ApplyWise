# frozen_string_literal: true

module LLM
  module Assistants
    class ProfileCreator < ::LLM::GPT::Assistant
      attr_reader :text_pdf

      NAME = "Career Coach"

      INSTRUCTIONS = <<~TEXT
        You are a career coach and resume analyzer.
        Use the provided functions to help professionals to update their professional profile.
        Use the language detected in the resume to update the profile.
      TEXT

      TOOLS = [
        {
          type: "function",
          function: {
            name: "update_professional_information",
            description: "Update the information of the professional.",
            parameters: {
              type: "object",
              properties: {
                information: {
                  type: "object",
                  description: "The information of the professional",
                  properties: {
                    name: { type: "string", description: "The name of the professional" },
                    email: { type: "string", description: "The email of the professional" },
                    phone: { type: "string", description: "The phone of the professional" },
                    location: { type: "string", description: "The location of the professional" },
                    linkedin: { type: "string", description: "The linkedin of the professional" },
                    github: { type: "string", description: "The github of the professional" },
                    website: { type: "string", description: "The website of the professional" },
                    portfolio: { type: "string", description: "The portfolio of the professional" },
                    other: { type: "string", description: "Any other information of the professional" }
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_hero_headline",
            description: "Update the hero headline of the professional.",
            parameters: {
              type: "object",
              properties: {
                headline: { type: "string", description: "Professional headline that highlights the professional's expertise and value proposition." }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_roles",
            description:
              "Update the roles of the professional detected in the resume." \
              "The roles are the job titles of the professional.",
            parameters: {
              type: "object",
              properties: {
                roles: {
                  type: "array",
                  description: "The roles of the professional",
                  items: {
                    type: "string",
                    description: "The role of the professional"
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_skills",
            description:
              "Update the skills of the professional detected in the resume.",
            parameters: {
              type: "object",
              properties: {
                skills: {
                  type: "array",
                  description: "List both hard and soft skills of the professional." \
                               " Rank the skills from most relevant to least relevant.",
                  items: {
                    type: "object",
                    properties: {
                      skill: { type: "string", description: "The skill of the professional" },
                      type: { type: "string", description: "The type of the skill, hard or soft" },
                      relevance: { type: "integer", description: "The relevance between 1 and 10 of the skill" }
                    }
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_experience",
            description:
              "Update the experience of the professional detected in the resume. " \
              "This is usually the role and company the professional has worked in. " \
              "Detect or calculate the duration in years.",
            parameters: {
              type: "object",
              properties: {
                experience: {
                  type: "array",
                  description: "The experience of the professional",
                  items: {
                    type: "object",
                    properties: {
                      role: { type: "string", description: "The role of the professional in the company or place" },
                      place: { type: "string", description: "The name of the company or place" },
                      duration: { type: "integer", description: "The duration of the experience in years" }
                    }
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_education",
            description:
              "Update the education of the professional detected in the resume." \
              "Detect or calculate the duration in years.",
            parameters: {
              type: "object",
              properties: {
                education: {
                  type: "array",
                  description: "The education of the professional",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string", description: "The name of the education or institution" },
                      duration: { type: "integer", description: "The duration of the education in years" }
                    }
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_certifications",
            description: "Update the certifications of the professional detected in the resume",
            parameters: {
              type: "object",
              properties: {
                certifications: {
                  type: "array",
                  description: "The certifications of the professional",
                  items: {
                    type: "string",
                    description: "The certification of the professional"
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_achievements",
            description:
              "Update the achievements (sometime in the sense of metrics) of the professional detected in the resume." \
              "Specify who or what (company, team, etc, if specified) benefited from the achievement.",
            parameters: {
              type: "object",
              properties: {
                achievements: {
                  type: "array",
                  description: "The achievements of the professional",
                  items: {
                    type: "string",
                    description: "The achievement of the professional"
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_keywords",
            description:
              "Update all the keywords (that could be used as tags) detected in the resume. " \
              "Rank the keywords from most relevant (10) to least relevant (1).",
            parameters: {
              type: "object",
              properties: {
                keywords: {
                  type: "array",
                  description: "The keywords.",
                  items: {
                    type: "object",
                    properties: {
                      category: {
                        type: "string",
                        description: "The category of the keyword, example: technology, programming, " \
                                     "soft_skills, etc"
                      },
                      relevance: {
                        type: "integer",
                        description: "The relevance between 1 and 10 of the keyword"
                      },
                      keyword: { type: "string", description: "The keyword detected in the resume" }
                    }
                  }
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_professional_summary",
            description: "Create a summary of around 100 words of the professional.",
            parameters: {
              type: "object",
              properties: {
                summary: {
                  type: "string",
                  description: "The summary of the professional"
                }
              },
              required: [ "summary" ]
            }
          }
        }
      ]

      def initialize(text_pdf)
        @text_pdf = text_pdf
        super(NAME, INSTRUCTIONS, TOOLS)
      end

      def call
        return if text_pdf.text.blank?

        description = text_pdf.talent.description.present? ?
          "This is my description: #{text_pdf.talent.description}." : ""
        resume = "This is my resume: #{text_pdf.text}."

        message(<<~TEXT
          Hello, I'm a professional and need your help to update my profile in a jobs board platform.

          <Description>
          #{description}
          </Description>

          <Resume>
          #{resume}
          </Resume>

          Please help me to update my profile.
        TEXT
        )
      end

      def update_build(obj)
        text_pdf.merge_build(obj)
      end

      %i[
        update_professional_information
        update_professional_hero_headline
        update_professional_roles
        update_professional_skills
        update_professional_education
        update_professional_experience
        update_professional_certifications
        update_professional_achievements
        update_professional_keywords
        update_professional_summary
      ].each do |method|
        alias_method method, :update_build
      end
    end
  end
end
