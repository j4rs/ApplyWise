import React, { useContext } from 'react'

import { JobContext } from './JobContext'

export const Application = () => {
  const job = useContext(JobContext)

  return <div>Application</div>
}
