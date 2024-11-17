import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon
} from '@heroicons/react/20/solid'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu
} from '../ui/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '../ui/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer
} from '../ui/sidebar'
import { SidebarLayout } from '../ui/sidebar-layout'
import { Strong } from '../ui/text'

const logout = (event) => {
  event.preventDefault()
  fetch('/sessions', { method: 'DELETE' }).then(() => {
    window.location.href = '/'
  })
}

export const Dashboard = () => (
  <SidebarLayout
    navbar={
      <Navbar>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem aria-label="Search" href="search">
            <MagnifyingGlassIcon />
          </NavbarItem>
          <NavbarItem aria-label="Inbox" href="inbox">
            <InboxIcon />
          </NavbarItem>
          <Dropdown>
            <DropdownButton as={NavbarItem}>
              <Avatar initials="AW" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end" className="min-w-64">
              <DropdownItem href="/my-profile">
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
        </NavbarSection>
      </Navbar>
    }
    sidebar={
      <Sidebar>
        <SidebarHeader>
          <Dropdown>
            <DropdownButton as={SidebarItem} className="lg:mb-2.5">
              <Avatar />
              <SidebarLabel>Apply Wise</SidebarLabel>
              <ChevronDownIcon />
            </DropdownButton>
            <DropdownMenu
              anchor="bottom start"
              className="min-w-80 lg:min-w-64"
            >
              <DropdownItem href="teams/1/settings">
                <Cog8ToothIcon />
                <DropdownLabel>Settings</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/teams/1">
                <Avatar initials="AW" />
                <DropdownLabel>Apply Wise</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/teams/2">
                <Avatar
                  className="bg-purple-500 text-white"
                  initials="WC"
                  slot="icon"
                />
                <DropdownLabel>Workcation</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/teams/create">
                <PlusIcon />
                <DropdownLabel>New team&hellip;</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <SidebarSection className="max-lg:hidden">
            <SidebarItem href="/search">
              <MagnifyingGlassIcon />
              <SidebarLabel>Search</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="inbox">
              <InboxIcon />
              <SidebarLabel>Inbox</SidebarLabel>
              <Badge color="blue">2</Badge>
            </SidebarItem>
          </SidebarSection>
        </SidebarHeader>
        <SidebarBody>
          <SidebarSection>
            <SidebarItem href="board">
              <HomeIcon />
              <SidebarLabel>
                <Strong>Board</Strong>
              </SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/events">
              <Square2StackIcon />
              <SidebarLabel>Events</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/orders">
              <TicketIcon />
              <SidebarLabel>Orders</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/settings">
              <Cog6ToothIcon />
              <SidebarLabel>Settings</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/broadcasts">
              <MegaphoneIcon />
              <SidebarLabel>Broadcasts</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
          <SidebarSection className="max-lg:hidden">
            <SidebarHeading>Upcoming Events</SidebarHeading>
            <SidebarItem href="/events/1">
              Bear Hug: Live in Concert
            </SidebarItem>
            <SidebarItem href="/events/2">Viking People</SidebarItem>
            <SidebarItem href="/events/3">Six Fingers — DJ Set</SidebarItem>
            <SidebarItem href="/events/4">We All Look The Same</SidebarItem>
          </SidebarSection>
          <SidebarSpacer />
          <SidebarSection>
            <SidebarItem href="/support">
              <QuestionMarkCircleIcon />
              <SidebarLabel>Support</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/changelog">
              <SparklesIcon />
              <SidebarLabel>Changelog</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarBody>
        <SidebarFooter className="max-lg:hidden">
          <Dropdown>
            <DropdownButton as={SidebarItem}>
              <span className="flex min-w-0 items-center gap-3">
                <Avatar alt="" className="size-10" initials="JR" />
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    Jorge
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    erica@example.com
                  </span>
                </span>
              </span>
              <ChevronUpIcon />
            </DropdownButton>
            <DropdownMenu anchor="top start" className="min-w-64">
              <DropdownItem href="/my-profile">
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
)
