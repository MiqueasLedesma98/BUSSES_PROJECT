import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import LogoImg from "../assets/veotrans-logo.png";

const title = {
  "/dashboard/content": "Contenidos",
  "/dashboard/content/musics": "Contenidos > Musicas",
  "/dashboard/content/movies": "Contenidos > Películas",
  "/dashboard/advertising": "Publicidad",
  "/dashboard/enterprise": "Empresa",
  "/dashboard/metrics": "Metricas",
};

const MainHeader = () => {
  const { pathname } = useLocation();

  return (
    <Box
      component={"header"}
      sx={{
        display: "grid",
        gridArea: "header",
        gridTemplateColumns: "250px 3fr 1fr",
        placeItems: "center",
        height: "4rem",
      }}
    >
      <Box component={"center"}>
        <img src={LogoImg} style={{ width: "127px", height: "35px" }} />
      </Box>
      <Box
        sx={{
          display: "grid",
          width: "100%",
          placeContent: "flex-start",
        }}
      >
        <Typography fontWeight={"bold"} fontSize={24}>
          {title[pathname]}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "gird",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        <Typography variant="subtitle2">Admin</Typography>
        <Typography variant="body2">admin@admin.com</Typography>
      </Box>
    </Box>
  );
};

export default MainHeader;
