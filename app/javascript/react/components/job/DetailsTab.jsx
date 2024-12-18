import React, { useContext } from 'react'

import { Text } from '../ui/text'

import { JobContext } from './JobContext'

export const DetailsTab = () => {
  const job = useContext(JobContext)

  return (
    <>
      <Text>Descripion</Text>
      {job.description}
    </>
  )
}
