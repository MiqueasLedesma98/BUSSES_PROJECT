import { useModalStore } from "../store";
import { Box, Button } from "@mui/material";

export const StickyButton = ({ modal = "createMovie", btnText = "Crear" }) => {
  const openModal = useModalStore((store) => store.openModal);

  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 1,
        display: "flex",
        height: 40,
        justifyContent: "flex-end",
      }}
    >
      <Button
        sx={{ ml: 2 }}
        variant="contained"
        onClick={() => openModal(modal, true)}
      >
        {btnText}
      </Button>
    </Box>
  );
};
