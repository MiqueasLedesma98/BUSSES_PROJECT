import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useModalStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewVersion } from "../services";
import { enqueueSnackbar } from "notistack";

const modalKey = "version-modal";

const ReleaseNewVersion = () => {
  const open = useModalStore((s) => s.modals[modalKey]);

  const client = useQueryClient();

  const close = useModalStore((s) => s.closeModal);

  const { mutate } = useMutation({
    mutationKey: [modalKey],
    mutationFn: createNewVersion,
    onSuccess: (value) => {
      enqueueSnackbar(value, { variant: "success" });
      client.refetchQueries({ queryKey: ["get-version"] });
      close(modalKey);
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const handleClose = () => close(modalKey);

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          Crear nueva versión
        </Typography>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{ position: "absolute", top: ".5em", right: ".5em" }}
        >
          <Close />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Alert sx={{ mb: 2 }} severity="info">
          Esta acción propagara los cambios realizados en el servidor principal.
        </Alert>
        <DialogContentText>
          ¿Estas seguro de crear una nueva versión?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={mutate}>
          Si
        </Button>
        <Button color="error" variant="text" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReleaseNewVersion;
