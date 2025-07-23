import React from "react";
import { useModalStore } from "../store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const modalKey = "ask-delete";

const ModalAskDelete = () => {
  const open = useModalStore((s) => s.modals[modalKey]);
  const close = useModalStore((s) => s.closeModal);

  const handleClose = () => close(modalKey);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} component="span">
          Eliminar
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText>¿Estas seguro?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button>Si</Button>
        <Button color="error" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAskDelete;
