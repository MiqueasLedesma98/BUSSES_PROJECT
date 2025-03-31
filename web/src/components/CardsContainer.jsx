import { Box } from "@mui/material";
import CustomPagination from "./CustomPagination";
import { Card } from "./Card";

export const CardsContainer = ({ url = "" }) => {
  // TODO: Agregar fetch para los datos

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 350px))",
          justifyContent: "space-around",
          gap: "2rem",
        }}
      >
        {Array.from({ length: 20 })
          .fill({})
          .map((_, i) => (
            <Card key={i} />
          ))}
      </Box>
      <CustomPagination count={10} page={1} />
    </>
  );
};
