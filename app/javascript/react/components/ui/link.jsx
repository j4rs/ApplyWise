/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import { Link as RouterLink } from 'react-router-dom';

import * as Headless from '@headlessui/react';
import React, { forwardRef } from 'react';

export const Link = forwardRef(function Link(props) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} to={props.href} />
    </Headless.DataInteractive>
  );
});
