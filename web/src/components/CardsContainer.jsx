import { Box, CircularProgress, useTheme } from "@mui/material";
import { Card } from "./Card";
import React from "react";

export const CardsContainer = React.memo(({ data = [], isLoading }) => {
  const { palette } = useTheme();

  if (isLoading)
    return (
      <Box sx={{ display: "grid", placeContent: "center" }}>
        <CircularProgress size={60} sx={{ color: palette.primary.main }} />
      </Box>
    );

  return (
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
  );
});

CardsContainer.displayName = "CardsContainer";
