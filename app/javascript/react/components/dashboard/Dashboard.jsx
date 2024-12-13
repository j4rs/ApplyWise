import {
  HomeIcon,
  Square2StackIcon,
  TicketIcon,
  Cog6ToothIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  ChevronDoubleLeftIcon,
  UserIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

import isEmpty from 'lodash/isEmpty'

import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'

import {
  fetchProfile,
  updateProfile,
  updateTalentPreferences
} from '../board/network'
import { Avatar } from '../ui/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownDivider
} from '../ui/dropdown'
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
  SidebarHeading
} from '../ui/sidebar'
import { SidebarLayout } from '../ui/sidebar-layout'
import { Strong } from '../ui/text'

import { DashboardContext } from './DashboardContext'

const logout = (event) => {
  event.preventDefault()
  fetch('/sessions', { method: 'DELETE' }).then(() => {
    window.location.href = '/'
  })
}

const initials = (profile) => `${profile.first_name[0]}${profile.last_name[0]}`

const UserAvatar = ({ isCollapsed, profile }) => {
  if (isCollapsed) {
    return (
      <Avatar
        alt=""
        className="size-10 flex-shrink-0 hover:ring-2 hover:ring-zinc-300 dark:hover:ring-zinc-700"
        initials={initials(profile)}
      />
    )
  }

  let name = ''
  if (!isEmpty(profile.first_name)) {
    name = profile.first_name
  }
  if (!isEmpty(profile.last_name)) {
    name = `${name} ${profile.last_name}`
  }

  return (
    <span className="flex min-w-0 items-center gap-3">
      <Avatar
        alt=""
        className="size-10 flex-shrink-0"
        initials={initials(profile)}
      />
      <span className="min-w-0">
        {name && (
          <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
            {name}
          </span>
        )}
        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
          {profile.email}
        </span>
      </span>
    </span>
  )
}

const DEFAULT_PREFERENCES = { is_sidebar_collapsed: true }

export function Dashboard() {
  const [preferences, setPreferences] = useState(null)
  const [profile, setProfile] = useState(null)

  const onUpdateProfile = async (data) => {
    const newProfile = await updateProfile(data)
    setProfile(newProfile)
  }

  const asyncFetchProfile = async () => {
    setProfile(await fetchProfile())
  }

  React.useEffect(() => {
    asyncFetchProfile()
  }, [])

  React.useEffect(() => {
    if (!profile) return

    setPreferences(profile.preferences || DEFAULT_PREFERENCES)
  }, [profile])

  const onPreferencesChange = (prefs) => {
    updateTalentPreferences(prefs)
    setPreferences(prefs)
  }

  const toggleCollapse = (collapsed) => {
    updateTalentPreferences({ is_sidebar_collapsed: collapsed })
    setPreferences({ ...preferences, is_sidebar_collapsed: collapsed })
  }

  if (!profile || !preferences) return null

  const isCollapsed = preferences.is_sidebar_collapsed
  const iconWrapper = 'size-5 flex items-center justify-center flex-shrink-0'

  return (
    <DashboardContext.Provider
      value={{ onPreferencesChange, onUpdateProfile, preferences, profile }}
    >
      <SidebarLayout
        className={clsx(
          'transition-all duration-300',
          isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
        sidebar={
          <Sidebar
            className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
          >
            <SidebarHeader>
              <SidebarSection>
                <SidebarItem
                  className={clsx(
                    'cursor-pointer',
                    isCollapsed && 'justify-center'
                  )}
                  onClick={() => toggleCollapse(!isCollapsed)}
                >
                  <div className={iconWrapper}>
                    <ChevronDoubleLeftIcon
                      className={clsx(
                        'w-full h-full',
                        'transition-transform duration-300',
                        isCollapsed ? 'rotate-180' : ''
                      )}
                    />
                  </div>
                  {!isCollapsed && <SidebarLabel>Collapse Menu</SidebarLabel>}
                </SidebarItem>
              </SidebarSection>
            </SidebarHeader>

            <SidebarBody>
              <SidebarSection>
                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/dashboard/boards"
                >
                  <div className={iconWrapper}>
                    <HomeIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && (
                    <SidebarLabel>
                      <Strong>Boards</Strong>
                    </SidebarLabel>
                  )}
                </SidebarItem>

                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/events"
                >
                  <div className={iconWrapper}>
                    <Square2StackIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && <SidebarLabel>Events</SidebarLabel>}
                </SidebarItem>

                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/orders"
                >
                  <div className={iconWrapper}>
                    <TicketIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && <SidebarLabel>Orders</SidebarLabel>}
                </SidebarItem>

                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/settings"
                >
                  <div className={iconWrapper}>
                    <Cog6ToothIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && <SidebarLabel>Settings</SidebarLabel>}
                </SidebarItem>

                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/broadcasts"
                >
                  <div className={iconWrapper}>
                    <MegaphoneIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && <SidebarLabel>Broadcasts</SidebarLabel>}
                </SidebarItem>
              </SidebarSection>

              {!isCollapsed && (
                <SidebarSection className="max-lg:hidden">
                  <SidebarHeading>Upcoming Events</SidebarHeading>
                  <SidebarItem href="/events/1">
                    Bear Hug: Live in Concert
                  </SidebarItem>
                  <SidebarItem href="/events/2">Viking People</SidebarItem>
                  <SidebarItem href="/events/3">
                    Six Fingers — DJ Set
                  </SidebarItem>
                  <SidebarItem href="/events/4">
                    We All Look The Same
                  </SidebarItem>
                </SidebarSection>
              )}

              <SidebarSpacer />

              <SidebarSection>
                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/support"
                >
                  <div className={iconWrapper}>
                    <QuestionMarkCircleIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && <SidebarLabel>Support</SidebarLabel>}
                </SidebarItem>

                <SidebarItem
                  className={isCollapsed ? 'justify-center' : ''}
                  href="/changelog"
                >
                  <div className={iconWrapper}>
                    <SparklesIcon className="w-full h-full" />
                  </div>
                  {!isCollapsed && <SidebarLabel>Changelog</SidebarLabel>}
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>

            <SidebarFooter className="max-lg:hidden">
              <Dropdown>
                {isCollapsed ? (
                  <DropdownButton
                    as="div"
                    className="flex w-full items-center justify-center rounded-lg px-2 py-2.5 text-left !cursor-pointer"
                  >
                    <UserAvatar isCollapsed={isCollapsed} profile={profile} />
                  </DropdownButton>
                ) : (
                  <DropdownButton
                    as="div"
                    className="!cursor-pointer [&_*]:!cursor-pointer"
                  >
                    <SidebarItem className="gap-3">
                      <UserAvatar isCollapsed={isCollapsed} profile={profile} />
                    </SidebarItem>
                  </DropdownButton>
                )}

                <DropdownMenu anchor="top start" className="min-w-64">
                  <DropdownItem href="/dashboard/profile">
                    <UserIcon />
                    <DropdownLabel>My profile</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/settings">
                    <Cog8ToothIcon />
                    <DropdownLabel>Settings</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/privacy-policy">
                    <ShieldCheckIcon />
                    <DropdownLabel>Privacy policy</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem href="/share-feedback">
                    <LightBulbIcon />
                    <DropdownLabel>Share feedback</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem href="/sessions" onClick={logout}>
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SidebarFooter>
          </Sidebar>
        }
      >
        <Outlet />
      </SidebarLayout>
    </DashboardContext.Provider>
  )
}
