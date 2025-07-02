import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useModalStore } from "../store";
import { Check } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const open = useModalStore((s) => s.modals?.success);
  const close = useModalStore((s) => s.closeModal);

  const navigate = useNavigate();

  const handleClose = () => close("success");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", position: "relative", py: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        Archivo cargado exitosamente
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Check
          sx={{
            my: 2,
            fontSize: 100,
            color: "primary.main",
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", py: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await navigate(open?.redir || "/dashboard");
            handleClose();
          }}
        >
          {open?.text || 'Éxito'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Success;
