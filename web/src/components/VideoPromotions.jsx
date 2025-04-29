import { Alert, Box, Button, Typography } from "@mui/material";
import React from "react";
import { Card } from "./Card";

export const VideoPromotions = () => {
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
          <Button variant="contained">Nuevo Comercial</Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
          // justifyContent: "space-around",
          gap: "30px",
        }}
      >
        <Alert severity="info">No se han subido promociones</Alert>
        {/* <Card />
        <Card />
        <Card />
        <Card /> */}
      </Box>
    </>
  );
};
