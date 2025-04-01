import { Box, Stack, Typography, useTheme } from "@mui/material";
import { SideBar } from "../components";

export default function Construction() {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        gridArea: "main",
        display: "grid",
        placeContent: "center",
        bgcolor: palette.grey[100],
      }}
    >
      <Typography component={"h2"} variant="h2">
        Construcción...
      </Typography>
    </Box>
  );
}
