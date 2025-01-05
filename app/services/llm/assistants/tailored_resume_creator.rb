# frozen_string_literal: true

module LLM
  module Assistants
    class TailoredResumeCreator < ::LLM::GPT::Assistant
      attr_reader :tailored_resume

      NAME = "Professional Resume Writer"

      INSTRUCTIONS = <<~TEXT
        You are a professional resume writer.
        Use the provided functions to help professionals write tailored resumes for provided jobs.
        You will be given a job description and a professional generic resume.
        You must write a tailored resume that is ATS-friendly for the professional to apply to the job.

        Tips for writing the resume in a ATS-friendly format:
        - Use action verbs and quantifiable achievements to showcase the professional's impact.
        - Use keywords from the job description and the professional profile to ensure the
          professional's skills align with the job and the employer's requirements.
        - Use bullet points and short sentences to make the resume more readable.
        - Use a professional and formal tone.
      TEXT

      TOOLS = [
        {
          type: "function",
          function: {
            name: "update_tailored_resume_headline",
            description: "Update the headline of the resume using the professional profile.",
            parameters: {
              type: "object",
              properties: {
                headline: {
                  type: "string",
                  description: "A concise headline or objective statement highlighting the" \
                               " professional's key skills and career goals that can help grab the ATS's attention." \
                               " Do not invent information like stating that the professional has experience or is passionate" \
                               " about something that is not in the professional profile."
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_tailored_resume_summary",
            description: "Update the summary of the resume using the professional profile.",
            parameters: {
              type: "object",
              properties: {
                summary: {
                  type: "string",
                  description: "A concise summary or objective statement highlighting the professional's" \
                               " key skills and career goals that can help grab the ATS's attention."
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "update_tailored_resume_work_experience",
            description: "Update the work experience of the professional.",
            parameters: {
              type: "object",
              properties: {
                work_experience: {
                  type: "array",
                  description: "This is a crucial section where you detail the professional's past work experience," \
                               " including job titles, company names, dates of employment, and a description of" \
                               " the professional's responsibilities and accomplishments. Use action verbs and" \
                               " quantifiable achievements to showcase the professional's impact.",
                  items: {
                    type: "object",
                    properties: {
                      role: { type: "string", description: "The role of the professional in the job" },
                      company: { type: "string", description: "The name of the company" },
                      duration: { type: "string", description: "The duration in years of the job" },
                      description: { type: "string", description: "The description of the job" }
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
            name: "update_tailored_resume_skills",
            description: "Update the skills of the professional.",
            parameters: {
              type: "object",
              properties: {
                skills: {
                  type: "array",
                  description: "List both hard and soft skills relevant to the job you're applying for." \
                               " Use keywords from the job description to ensure the professional's skills align" \
                               " with the employer's and the job requirements. Rank the skills from most relevant to least relevant.",
                  items: {
                    type: "object",
                    properties: {
                      skill: { type: "string", description: "The skill of the professional" },
                      relevance: { type: "number", description: "The relevance between 1 and 10 of the skill to the job" }
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
            name: "update_tailored_resume_education",
            description: "Update the education of the professional.",
            parameters: {
              type: "object",
              properties: {
                education: {
                  type: "array",
                  description: "List the professional's educational background, including degrees, certifications," \
                               " and any relevant coursework. Highlight the professional's academic achievements" \
                               " and any relevant skills or knowledge gained through their studies.",
                  items: {
                    type: "object",
                    properties: {
                      degree: { type: "string", description: "The degree of the professional" },
                      school: { type: "string", description: "The name of the school" },
                      duration: { type: "string", description: "The duration in years of the education" },
                      description: { type: "string", description: "The description of the education" }
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
            name: "update_tailored_resume_achievements",
            description: "Update the achievements, awards and recognitions of the professional.",
            parameters: {
              type: "object",
              properties: {
                achievements: {
                  type: "array",
                  description: "List the professional's achievements, awards, and recognitions." \
                               " Use action verbs and quantifiable achievements to showcase the professional's impact.",
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
            name: "update_tailored_resume_portfolio",
            description: "If applicable, update the portfolio of the professional.",
            parameters: {
              type: "object",
              properties: {
                portfolio: {
                  type: "array",
                  description: "List the professional's portfolio, including links to their projects," \
                               " case studies, or any relevant work samples. Use action verbs and" \
                               " quantifiable achievements to showcase the professional's impact.",
                  items: {
                    type: "string",
                    description: "The portfolio of the professional"
                  }
                }
              }
            }
          }
        }
      ]

      def initialize(tailored_resume)
        @tailored_resume = tailored_resume
        super(NAME, INSTRUCTIONS, TOOLS)
      end

      def call
        return if tailored_resume.build.present?
        return if tailored_resume.job.description.blank?
        return if tailored_resume.talent.build.blank?

        message(<<~TEXT
          Hello, I'm a professional and need your help to write a tailored resume for a job description.

          <Job description>
          #{tailored_resume.job.description}
          </Job description>

          <Professional profile>
          #{tailored_resume.talent.last_text_pdf.text}
          </Professional profile>

          Please help me to write a tailored resume for this job.
          Use the language detected in the job description to write the tailored resume.
        TEXT
        )
      end

      def update_build(obj)
        tailored_resume.merge_build(obj)
      end

      %i[
        update_tailored_resume_headline
        update_tailored_resume_summary
        update_tailored_resume_work_experience
        update_tailored_resume_skills
        update_tailored_resume_education
        update_tailored_resume_achievements
        update_tailored_resume_portfolio
      ].each do |method|
        alias_method method, :update_build
      end
    end
  end
end
