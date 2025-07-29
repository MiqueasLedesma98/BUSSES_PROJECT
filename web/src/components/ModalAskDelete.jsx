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
import api from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const modalKey = "ask-delete";

const mutationFn = async (id) => await api.delete(`/upload/${id}`);

const ModalAskDelete = () => {
  const open = useModalStore((s) => s.modals[modalKey]);
  const close = useModalStore((s) => s.closeModal);

  const handleClose = () => close(modalKey);
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [modalKey],
    mutationFn,
    onSuccess: () => {
      enqueueSnackbar("¡Archivo eliminado correctamente!", {
        variant: "success",
      });
      client.refetchQueries({ type: "active" });
      close(modalKey);
    },
    onError: (error) =>
      enqueueSnackbar(`A ocurrido un error: ${error.message}`, {
        variant: "error",
      }),
  });

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
        <DialogContentText>Esta acción es irreversible</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => mutate(open)}>Si</Button>
        <Button color="error" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAskDelete;
