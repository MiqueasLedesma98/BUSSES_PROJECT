import { Box,  Stack, Typography } from "@mui/material";
import { SideBar } from "../components";

export default function Construction() {
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
        <h1>En construccion...</h1>
      </Box>
    </Box>
  );
}

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
