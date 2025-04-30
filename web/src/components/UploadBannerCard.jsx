import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPromotion } from "../services";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import { baseURL } from "../api";
import { useModalStore } from "../store";

export const UploadBannerCard = ({
  lang = "esp",
  type = "banner",
  type_banner = "welcome_banner",
  title = "Banner pantalla de bienvenida",
}) => {
  const openModal = useModalStore((s) => s.openModal);

  const { isFetching, data } = useQuery({
    queryKey: ["welcome-banner", lang, type, type_banner],
    queryFn: getPromotion,
    meta: { type: "banner", lang, type_banner },
  });

  return (
    <Card
      elevation={0}
      sx={{
        width: 400,
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      {isFetching ? <LinearProgress /> : null}

      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      </CardContent>

      {data?.path && !isFetching ? (
        <CardMedia
          component={"img"}
          height={180}
          image={baseURL + data?.path}
          sx={{ objectFit: "contain" }}
        />
      ) : (
        <Alert sx={{ my: 5 }} severity="info">
          No se ha subido un archivo
        </Alert>
      )}

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal("createPromotion", { type, type_banner, title })}
        >
          Cambiar contenido
        </Button>
      </CardActions>
    </Card>
  );
};
