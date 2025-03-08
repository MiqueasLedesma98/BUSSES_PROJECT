import { Box, Button, Stack, Typography } from "@mui/material";
import LogoImg from "../assets/veotrans-logo.png";
import IconMovie from "../assets/icon-movie.png";
import IconChat from "../assets/icon-chat.png";
import IconGraph from "../assets/icon-graph.png";
import IconHelp from "../assets/icon-help.png";
export default function Dashboard() {
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"15% 1fr"}
      width={"100vw"}
      height={"100vh"}
    >
      <SideBar />
      <Box sx={{ backgroundColor: "#f8f8f8", width: "100%" }}>
        <Header />
        <Box width={"100%"} height={"100px"} display={"flex"} alignItems={"center"} justifyContent={"end"}>
          <Button variant="contained" sx={{height:"40px", marginRight:"30px"}}>
            Nueva película
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const SideBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <img src={LogoImg} style={{ width: "127px", height: "35px" }} />
      <Stack
        sx={{
          width: "100%",
          paddingTop: "50px",
          paddingLeft: "50px",
          gap: "30px",
        }}
      >
        <Box display={"flex"} gap={2} alignItems={"center"} width={"100%"}>
          <img src={IconMovie} alt="icon_movie" style={{ width: "25px" }} />
          <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
            Contenidos
          </Typography>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <img src={IconChat} alt="icon_movie" style={{ width: "25px" }} />
          <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
            Publicidad
          </Typography>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <img src={IconHelp} alt="icon_movie" style={{ width: "25px" }} />
          <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
            Empresa
          </Typography>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <img src={IconGraph} alt="icon_movie" style={{ width: "25px" }} />
          <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
            Métricas
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
const Header = () => {
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      width={"100%"}
      height={"100px"}
      display={"flex"}
      alignItems={"center"}
    >
      <Box flexGrow={1} padding={3}>
        <Typography variant="h4" fontWeight={700}>
          Contenidos &#62; películas
        </Typography>
      </Box>
      <Stack padding={7}>
        <Typography variant="subtitle2">Admin</Typography>
        <Typography variant="subtitle2" color="grey">
          admin@gmail.com
        </Typography>
      </Stack>
    </Box>
  );
};
