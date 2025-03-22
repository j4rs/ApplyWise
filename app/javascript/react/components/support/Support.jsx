import React from 'react'

import { Heading } from '../ui/heading'
import { Link } from '../ui/link'
import { Text } from '../ui/text'

export const Support = () => (
  <div>
    <Heading>Support</Heading>
    <span>
      If you have any questions or need help, please send us an email at
    </span>
    &nbsp;
    <Link
      className="font-semibold text-blue-700"
      href="mailto:support@applywise.ai"
    >
      support@applywise.ai
    </Link>
    &nbsp;
    <span>and we will get back to you as soon as possible.</span>
  </div>
)
