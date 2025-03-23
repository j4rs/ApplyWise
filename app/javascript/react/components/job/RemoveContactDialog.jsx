import React from 'react'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions
} from '../ui/dialog'

export const RemoveContactDialog = ({ isOpen, onClose, onConfirm }) => (
  <Dialog onClose={onClose} open={isOpen}>
    <DialogTitle>Remove contact</DialogTitle>
    <DialogDescription>
      Are you sure you want to remove this contact?
    </DialogDescription>
    <DialogActions>
      <Button plain onClick={onClose}>
        Cancel
      </Button>
      <Button color="red" onClick={onConfirm}>
        Remove
      </Button>
    </DialogActions>
  </Dialog>
)
