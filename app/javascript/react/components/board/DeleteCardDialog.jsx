import React from 'react'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions
} from '../ui/dialog'

export const DeleteCardDialog = ({ isOpen, onClose, onConfirm }) => (
  <Dialog onClose={onClose} open={isOpen}>
    <DialogTitle>Delete job</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete this job?
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
