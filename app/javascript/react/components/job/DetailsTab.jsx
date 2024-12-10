import React, { useContext } from 'react'

import { JobContext } from './JobContext'

export const DetailsTab = () => {
  const job = useContext(JobContext)

  return <div>Details</div>
}
