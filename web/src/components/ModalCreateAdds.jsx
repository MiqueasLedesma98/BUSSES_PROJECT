import React, { useMemo } from "react";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import { useModalStore } from "../store";
import { Close } from "@mui/icons-material";

const ModalCreateAdds = () => {
  const data = useModalStore((s) => s.modals["createAds"]);
  const close = useModalStore((s) => s.closeModal);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={!!data}
      onClose={() => close("createAds")}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} component="span">
          Carga tu archivo
        </Typography>
        <Button variant="text" onClick={() => close("createAds")}>
          <Close />
        </Button>
      </DialogTitle>
    </Dialog>
  );
};

export default ModalCreateAdds;
