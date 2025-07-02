import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useModalStore } from "../store";

const modalKey = "version-modal";

// TODO: Falta hacer la petición

const ReleaseNewVersion = () => {
  const open = useModalStore((s) => s[modalKey]);

  const close = useModalStore((s) => s.closeModal);

  const handleClose = () => close(modalKey);

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>
        <Button variant="text" sx={{ position: "absolute", top: 2, right: 2 }}>
          <Close />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Alert severity="info">
          Esta acción propagara los cambios realizados en el servidor principal.
        </Alert>
        <DialogContentText>
          ¿Estas seguro de crear una nueva versión?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text">Si</Button>
        <Button color="error" variant="text">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReleaseNewVersion;
