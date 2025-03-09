import { Box, Button, Stack, Typography } from "@mui/material";
import { Card, SideBar } from "../components";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
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
        <Box
          width={"100%"}
          height={"100px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" fontWeight={700} padding={3}>
            Películas
          </Typography>
          <Box sx={{ padding: "20px", display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              sx={{
                height: "40px",
                width: "150px",
                borderRadius: "10px",
              }}
            >
              Nueva película
            </Button>
            <Button
              variant="outlined"
              sx={{
                height: "40px",
                width: "150px",
                borderRadius: "10px",
                border: "2px solid #1976d2",
              }}
              onClick={() => navigate("/dashboard/movies")}
            >
              Ver todo
            </Button>
          </Box>
        </Box>
        <CardsContainer />
        <Box
          width={"100%"}
          height={"100px"}
          display={"flex"}
          alignItems={"center"}
          marginTop={3}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" fontWeight={700} padding={3}>
            Músicas
          </Typography>
          <Box sx={{ padding: "20px", display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              sx={{
                height: "40px",
                width: "150px",
                borderRadius: "10px",
              }}
            >
              Nueva canción
            </Button>
            <Button
              variant="outlined"
              sx={{
                height: "40px",
                width: "150px",
                borderRadius: "10px",
                border: "2px solid #1976d2",
              }}
              onClick={() => navigate("/dashboard/musics")}
            >
              Ver todo
            </Button>
          </Box>
        </Box>
        <CardsContainer />
      </Box>
    </Box>
  );
}
const CardsContainer = () => {
  return (
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
          Contenidos
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
