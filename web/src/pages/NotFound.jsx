import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega una página hacia atrás
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#333",
        padding: "2rem",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: "5rem", color: "#d32f2f", mb: 2 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ textTransform: "none" }}
      >
        Volver a la página anterior
      </Button>
    </Box>
  );
};

export default NotFound;
