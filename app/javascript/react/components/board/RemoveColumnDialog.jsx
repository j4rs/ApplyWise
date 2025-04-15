import React from 'react'

import { ActionDialog } from '../common/ActionDialog'

export const RemoveColumnDialog = ({ isOpen, onClose, onConfirm }) => (
  <ActionDialog
    actionButtonColor="red"
    actionButtonText="Delete"
    cancelButtonText="Cancel"
    description="Are you sure you want to delete this stage?"
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title="Delete this stage"
  />
)
