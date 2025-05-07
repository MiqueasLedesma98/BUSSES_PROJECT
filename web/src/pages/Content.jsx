import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components";
import { useModalStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { getMedia } from "../services/list.query";

const ContentTypeRender = React.memo(
  ({ title = "", newBtnText = "", redirect = "", type = "" }) => {
    const navigate = useNavigate();
    const openModal = useModalStore((store) => store.openModal);

    const { data, isLoading } = useQuery({
      queryKey: [`home-cards-${type}`],
      meta: { page: 1, limit: 20, type, lang: "all" },
      queryFn: getMedia,
    });

    return (
      <Stack direction="column" gap="2rem" mb="3rem">
        <Box sx={{ display: "flex", placeContent: "space-between" }}>
          <Typography fontWeight={"bold"} fontSize={24} variant="subtitle1">
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={() =>
                openModal(
                  type === "music" ? "createMusic" : "createMovie",
                  true
                )
              }
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

        {!data?.results?.length ? (
          <Alert severity="info">No se encuentran registros</Alert>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: "2rem",
              placeContent: "center",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 350px))",
              paddingBottom: "1rem", // Add padding for better UX
            }}
          >
            {isLoading ? <CircularProgress variant="indeterminate" /> : null}
            {data?.results.map((c) => (
              <Card key={c.id} {...c} />
            ))}
          </Box>
        )}
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
          type="movie"
        />

        <ContentTypeRender
          title="Música"
          redirect="/musics"
          newBtnText="Nueva canción"
          type="music"
        />
      </Box>
    );
  else return <Outlet />;
};

export default Content;
