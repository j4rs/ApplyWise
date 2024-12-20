import clsx from 'clsx'
import React from 'react'

import { Button } from './button'

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  ...props
}) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={clsx(className, 'flex gap-x-2')}
    />
  )
}

export function PaginationPrevious({
  children = 'Previous',
  className,
  href = null
}) {
  return (
    <span className={clsx(className, 'grow basis-0')}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        plain
        aria-label="Previous page"
      >
        <svg
          aria-hidden="true"
          className="stroke-current"
          data-slot="icon"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
        {children}
      </Button>
    </span>
  )
}

export function PaginationNext({ children = 'Next', className, href = null }) {
  return (
    <span className={clsx(className, 'flex grow basis-0 justify-end')}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        plain
        aria-label="Next page"
      >
        {children}
        <svg
          aria-hidden="true"
          className="stroke-current"
          data-slot="icon"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      </Button>
    </span>
  )
}

export function PaginationList({ className, ...props }) {
  return (
    <span
      {...props}
      className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')}
    />
  )
}

export function PaginationPage({ children, className, current = false, href }) {
  return (
    <Button
      plain
      aria-current={current ? 'page' : undefined}
      aria-label={`Page ${children}`}
      className={clsx(
        className,
        'min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg',
        current && 'before:bg-zinc-950/5 dark:before:bg-white/10'
      )}
      href={href}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  )
}

export function PaginationGap({
  children = <>&hellip;</>,
  className,
  ...props
}) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        'w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white'
      )}
    >
      {children}
    </span>
  )
}
