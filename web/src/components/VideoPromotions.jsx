import { Alert, Box, Button, Typography } from "@mui/material";
import { useModalStore } from "../store";
import { useQuery } from "@tanstack/react-query";

const modalKey = "create-publicity";

// TODO: mostrar las video promociones

export const VideoPromotions = () => {
  const openModal = useModalStore((s) => s.openModal);

  const { data, isFetching } = useQuery({
    queryKey: ["video-promotions"],
    enabled: false,
  });

  return (
    <>
      <Box
        width={"100%"}
        height={"100px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" fontWeight={700} padding={3}>
          Comerciales
        </Typography>
        <Box sx={{ padding: "20px", display: "flex", gap: "15px" }}>
          <Button onClick={() => openModal(modalKey, true)} variant="contained">
            Nuevo Comercial
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
          gap: "30px",
        }}
      >
        <Alert severity="info">No se han subido promociones</Alert>
      </Box>
    </>
  );
};
