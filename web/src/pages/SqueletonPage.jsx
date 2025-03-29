import { Skeleton, Box } from "@mui/material";
import React from "react";

const SqueletonPage = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      justifyContent={"center"}
      alignContent={"center"}
      gap={2}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <Box key={index}>
          <Skeleton variant="rectangular" width={350} height={250} />
        </Box>
      ))}
    </Box>
  );
};

export default SqueletonPage;
