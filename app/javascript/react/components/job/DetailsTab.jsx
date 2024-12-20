import React, { useContext } from 'react'

import { Divider } from '../ui/divider'
import { Subheading } from '../ui/heading'
import { Text } from '../ui/text'

import { JobContext } from './JobContext'

export const DetailsTab = () => {
  const job = useContext(JobContext)

  return (
    <>
      <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-4">
        <Subheading>Descripion</Subheading>
        <Divider />
        <div className="h-56 overflow-scroll">
          <Text>
            {job.description.split('\n').map(
              (line, index) =>
                line.length > 0 && (
                  <span className="block mb-4" key={index}>
                    {line}
                  </span>
                )
            )}
          </Text>
        </div>
      </div>
    </>
  )
}
