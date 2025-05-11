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
      justifyItems="center"
      gap={2}
      px={2}
      maxWidth="1200px"
      mx="auto"
      mt={4}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={300}
          height={200}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Box>
  );
};

export default SqueletonPage;
