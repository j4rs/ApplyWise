import React from 'react'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions,
  DialogBody
} from '../ui/dialog'

export const ActionDialog = ({
  actionButtonColor = 'blue',
  actionButtonText = 'Confirm',
  body = null,
  cancelButtonText = 'Cancel',
  description,
  isOpen,
  onClose,
  onConfirm,
  title
}) => (
  <Dialog onClose={onClose} open={isOpen}>
    <DialogTitle>{title}</DialogTitle>
    <DialogDescription>{description}</DialogDescription>
    {body && <DialogBody>{body}</DialogBody>}
    <DialogActions>
      <Button plain onClick={onClose}>
        {cancelButtonText}
      </Button>
      <Button color={actionButtonColor} onClick={onConfirm}>
        {actionButtonText}
      </Button>
    </DialogActions>
  </Dialog>
)
