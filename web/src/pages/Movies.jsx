import { Box } from "@mui/material";
import { CardsContainer } from "../components/CardsContainer.jsx";
import { StickyButton } from "../components/StickyButton.jsx";

export default function Movies() {
  return (
    <Box
      sx={{
        gridArea: "main",
        padding: "1rem 2rem 2rem 2rem",
        display: "grid",
        backgroundColor: "#f8f8f8",
        overflow: "auto",
      }}
    >
      <StickyButton btnText="Crear Pelicula" />
      <CardsContainer />
    </Box>
  );
}
