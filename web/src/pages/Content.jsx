import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components";
import { useModalStore } from "../store";

const ContentTypeRender = React.memo(
  ({
    title = "",
    newBtnText = "",
    postUrl = "/",
    getUrl = "/",
    redirect = "",
  }) => {
    const navigate = useNavigate();
    const openModal = useModalStore((store) => store.openModal);

    console.log({ postUrl, getUrl });

    return (
      <Stack direction="column" gap="2rem" mt="2em">
        <Box sx={{ display: "flex", placeContent: "space-between" }}>
          <Typography fontWeight={"bold"} fontSize={24} variant="subtitle1">
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={() => openModal("createMovie", true)}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              {newBtnText}
            </Button>
            <Button
              onClick={() => navigate("/dashboard/content" + redirect)}
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Ver todo
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: "2rem",
            placeContent: "center",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 350px))",
          }}
        >
          <Card />
          <Card />
          <Card />
        </Box>
      </Stack>
    );
  }
);

const Content = () => {
  const { pathname } = useLocation();
  const { palette } = useTheme();

  if (pathname === "/dashboard/content")
    return (
      <Box
        sx={{
          height: "100%",
          gridArea: "main",
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          padding: "2rem",
          background: palette.grey["100"],
          overflowY: "scroll",
        }}
      >
        <ContentTypeRender
          title="Películas"
          redirect="/movies"
          newBtnText="Nueva película"
          postUrl="/"
          getUrl="/"
        />

        <ContentTypeRender
          title="Música"
          redirect="/musics"
          newBtnText="Nueva canción"
          postUrl="/"
          getUrl="/"
        />
      </Box>
    );
  else return <Outlet />;
};

export default Content;
