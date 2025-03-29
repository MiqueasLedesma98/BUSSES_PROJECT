import { Box } from "@mui/material";
import { Card } from "../components/index.js";

export default function Movies() {
  return (
    <Box
      sx={{
        gridArea: "main",
        padding: "2rem",
        display: "grid",
        overflowY: "scroll",
        backgroundColor: "#f8f8f8",
      }}
    >
      <CardsContainer />
    </Box>
  );
}

const CardsContainer = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 350px))",
        justifyContent: "space-around",
        gap: "30px",
      }}
    >
      {Array.from({ length: 12 })
        .fill({})
        .map((_, i) => (
          <Card key={i} />
        ))}
    </Box>
  );
};
