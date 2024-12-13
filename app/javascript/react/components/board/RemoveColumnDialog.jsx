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
    <DialogTitle>Delete this stage</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete this stage?
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
