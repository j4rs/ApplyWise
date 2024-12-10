import React from 'react'

import { Button } from '../ui/button'

import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle
} from '../ui/dialog'

export const RemoveColumnDialog = ({ isOpen, onClose, onConfirm }) => (
  <Dialog onClose={onClose} open={isOpen}>
    <DialogTitle>Delete view</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete view this view?
    </DialogDescription>
    <DialogActions>
      <Button plain onClick={onClose}>
        Cancel
      </Button>
      <Button color="red" onClick={onConfirm}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)
