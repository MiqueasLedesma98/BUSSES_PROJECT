import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega una página hacia atrás
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        alignItems: "center",
        gap: "1rem",
        gridArea: "main",
      }}
    >
      <Typography fontWeight={"bold"}>Pagina no encontrada 404</Typography>
      <Button onClick={handleGoBack}>Volver</Button>
    </Box>
  );
};

export default NotFound;
