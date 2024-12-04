import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/16/solid'
import { InboxIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Avatar } from '../ui/avatar'
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
  SidebarItem,
  SidebarSection
} from '../ui/sidebar'
import { StackedLayout } from '../ui/stacked-layout'

const logout = (event) => {
  event.preventDefault()
  fetch('/sessions', { method: 'DELETE' }).then(() => {
    window.location.href = '/'
  })
}

const navItems = [{ label: 'Boards', url: '/dashboard/boards' }]

export const StackedLayoutDashboard = () => (
  <StackedLayout
    navbar={
      <Navbar>
        {/* <Dropdown>
        <DropdownButton as={NavbarItem} className="max-lg:hidden">
          <Avatar />
          <NavbarLabel>Apply Wise</NavbarLabel>
          <ChevronDownIcon />
        </DropdownButton>
        <TeamDropdownMenu />
      </Dropdown> */}
        {/* <NavbarDivider className="max-lg:hidden" /> */}
        <NavbarSection className="max-lg:hidden">
          {navItems.map(({ label, url }) => (
            <NavbarItem href={url} key={label}>
              {label}
            </NavbarItem>
          ))}
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem aria-label="Search" href="/search">
            <MagnifyingGlassIcon />
          </NavbarItem>
          <NavbarItem aria-label="Inbox" href="/inbox">
            <InboxIcon />
          </NavbarItem>
          <Dropdown>
            <DropdownButton as={NavbarItem}>
              <Avatar initials="JR" />
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
        <SidebarBody>
          <SidebarSection>
            {navItems.map(({ label, url }) => (
              <SidebarItem href={url} key={label}>
                {label}
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarBody>
      </Sidebar>
    }
  >
    <Outlet />
  </StackedLayout>
)
