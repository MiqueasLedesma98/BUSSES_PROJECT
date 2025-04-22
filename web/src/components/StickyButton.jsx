import { useTheme } from "@mui/material";
import { useModalStore } from "../store";
import { Box, Button } from "@mui/material";

export const StickyButton = ({ modal = "createMovie", btnText = "Crear" }) => {
  const { palette } = useTheme();

  const openModal = useModalStore((store) => store.openModal);

  return (
    <Box
      sx={{
        position: "sticky",
        top: "-1rem",
        zIndex: 1,
        marginBottom: "1.5rem",
        padding: "5px 0",
        display: "flex",
        justifyContent: "flex-end",
        height: 40,
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
