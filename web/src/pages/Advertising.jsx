import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { VideoPromotions, UploadBannerCard } from "../components";
import { useState } from "react";
import { RenewVersion } from "../components";

export default function Advertising() {
  const [lang, setLang] = useState("esp");

  return (
    <Box
      sx={({ palette }) => ({
        gridArea: "main",
        display: "grid",
        padding: 2,
        background: palette.grey["100"],
        overflowY: "scroll",
      })}
      gap={2}
    >
      <RenewVersion />
      <Stack width={300} direction={"row"} alignItems={"center"}>
        <Typography variant="h5" fontWeight={700} padding={3}>
          Banners
        </Typography>
        <Select
          value={lang}
          fullWidth
          size="small"
          onChange={(e) => setLang(e.target.value)}
        >
          <MenuItem value={"esp"}>Español</MenuItem>
          <MenuItem value={"eng"}>Ingles</MenuItem>
        </Select>
      </Stack>
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
          lang={lang}
          type="banner"
          type_banner="welcome_banner"
          title="Banner de pantalla de bienvenida"
        />

        <UploadBannerCard
          lang={lang}
          type="banner"
          type_banner="bottom_bar"
          title="Banner de pantalla de bienvenida, inferior"
        />
        <UploadBannerCard
          lang={lang}
          type="banner"
          type_banner="left_bar"
          title="Barra menú lateral"
        />
        <UploadBannerCard
          lang={lang}
          type="banner"
          type_banner="carousel_banner"
          title="Carrusel home"
        />
      </Box>

      <VideoPromotions lang={lang} />
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
