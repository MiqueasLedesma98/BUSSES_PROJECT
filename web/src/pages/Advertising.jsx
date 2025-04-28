import { Box, Button, Stack, Typography } from "@mui/material";
import ImagenBienvenida from "../assets/barra-bienvenida.png";
import RectanguloBienvenida from "../assets/rectangulo-bienvenida.png";
import { Card } from "../components";
import { useModalStore } from "../store";
export default function Advertising() {
  return (
    <Stack
      sx={({ palette }) => ({
        height: "100%",
        gridArea: "main",
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        padding: "2rem",
        background: palette.grey["100"],
        overflowY: "scroll",
      })}
      gap={2}
    >
      <Typography variant="h5" fontWeight={700} padding={3}>
        Banners
      </Typography>
      <Box display={"flex"} gap={"350px"} width={"100%"}>
        <Stack width={"300px"} alignItems={"center"} gap={2}>
          <Typography variant="subtitle2" fontWeight={700} padding={3}>
            Banner de pantalla de bienvenida
          </Typography>
          <img
            src={ImagenBienvenida}
            alt="imagen bienvenida"
            style={{ width: "270px" }}
          />
          <CambiarButton />
        </Stack>
        <Stack alignItems={"center"} gap={2}>
          <Typography variant="subtitle2" fontWeight={700} padding={3}>
            Banner de pantalla de bienvenida, barra inferior
          </Typography>
          <img
            src={RectanguloBienvenida}
            alt="imagen bienvenida"
            style={{ width: "270px" }}
          />
          <CambiarButton />
        </Stack>
      </Box>
      <Box display={"flex"} gap={"350px"} width={"100%"}>
        <Stack width={"300px"} alignItems={"center"} gap={2}>
          <Typography variant="subtitle2" fontWeight={700} padding={3}>
            Barra Menu Lateral
          </Typography>
          <img
            src={ImagenBienvenida}
            alt="imagen bienvenida"
            style={{ width: "270px" }}
          />
          <CambiarButton />
        </Stack>
        <Stack alignItems={"center"} gap={2}>
          <Typography variant="subtitle2" fontWeight={700} padding={3}>
            Carrousel Home
          </Typography>
          <img
            src={RectanguloBienvenida}
            alt="imagen bienvenida"
            style={{ width: "270px" }}
          />
          <CambiarButton />
        </Stack>
      </Box>
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
          <Button
            variant="contained"
            sx={{
              height: "40px",
              width: "200px",
              borderRadius: "10px",
            }}
          >
            Nuevo comercial
          </Button>
        </Box>
      </Box>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 350px))",
          justifyContent: "space-around",
          gap: "30px",
        }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Stack>
  );
}

const CambiarButton = ({ data }) => {

  const open = useModalStore('createAds', data )

  return (


    <Button
      variant="contained"
      sx={{ width: "196px", height: "54px", borderRadius: "14px" }}
    >
      Cambiar contenido
    </Button>
  )
};
