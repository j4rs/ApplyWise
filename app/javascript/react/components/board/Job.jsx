import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle
} from '../ui/dialog'

import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '../ui/navbar'

import { fetchJob } from './network'

export const Job = () => {
  const { board_id, job_id } = useParams()
  const [job, setJob] = useState(null)

  console.log(board_id, job_id)

  // fetch job
  useEffect(() => {
    if (!job_id) return

    setJob(fetchJob(board_id, job_id))
  }, [board_id, job_id])

  if (!job) return null

  return (
    <Dialog onClose={() => {}} open={true}>
      <DialogTitle>Job</DialogTitle>
      <DialogDescription>
        Play with the tools to create a tailored resume and cover letter for
        this job.
      </DialogDescription>
      <DialogBody>
        <Navbar>
          <NavbarSection className="max-lg:hidden">
            <NavbarItem current href="/">
              Home
            </NavbarItem>
            <NavbarItem href="/events">Events</NavbarItem>
            <NavbarItem href="/orders">Orders</NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
        </Navbar>
      </DialogBody>
    </Dialog>
  )
}
