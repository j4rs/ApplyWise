import { SparklesIcon, UserIcon } from '@heroicons/react/20/solid'
import React from 'react'

import { Outlet } from 'react-router-dom'

import { useTabs } from '../hooks/useTabs'
import { Heading } from '../ui/heading'
import { Text } from '../ui/text'

const TABS = [
  { href: 'basic', icon: UserIcon, key: 'basic', name: 'Basic' },
  {
    href: 'build',
    icon: SparklesIcon,
    key: 'build',
    name: 'Skills Builder'
  }
]

export function Profile() {
  const { tabsUI } = useTabs(TABS)
  return (
    <>
      <Heading>Your profile</Heading>
      <Text>Update your profile information here.</Text>
      {tabsUI}
      <Outlet />
    </>
  )
}
