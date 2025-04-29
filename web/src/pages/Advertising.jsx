import { Box, Button, Stack, Typography } from "@mui/material";
import ImagenBienvenida from "../assets/barra-bienvenida.png";
import RectanguloBienvenida from "../assets/rectangulo-bienvenida.png";
import { VideoPromotions, UploadBannerCard } from "../components";

export default function Advertising() {
  return (
    <Box
      sx={({ palette }) => ({
        gridArea: "main",
        display: "grid",
        padding: "2rem",
        background: palette.grey["100"],
        overflowY: "scroll",
      })}
      gap={2}
    >
      <Typography variant="h5" fontWeight={700} padding={3}>
        Banners
      </Typography>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        gap={4}
        sx={{
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <UploadBannerCard
          lang="esp"
          type="banner"
          type_banner="welcome_banner"
          title="Banner de pantalla de bienvenida"
        />

        <UploadBannerCard
          lang="esp"
          type="banner"
          type_banner="bottom_bar"
          title="Banner de pantalla de bienvenida, inferior"
        />
        <UploadBannerCard
          lang="esp"
          type="banner"
          type_banner="left_bar"
          title="Barra menú lateral"
        />
        <UploadBannerCard
          lang="esp"
          type="banner"
          type_banner="carousel_banner"
          title="Carrusel home"
        />
      </Box>

      <VideoPromotions />
    </Box>
  );
}

const CambiarButton = () => {
  // const open = useModalStore("createAds", data);

  return (
    <Button
      variant="contained"
      sx={{ width: "196px", height: "54px", borderRadius: "14px" }}
    >
      Cambiar contenido
    </Button>
  );
};
