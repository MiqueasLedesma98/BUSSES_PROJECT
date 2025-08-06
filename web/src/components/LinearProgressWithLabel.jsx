import { Box, LinearProgress, Typography } from "@mui/material";

export default function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "grid", alignItems: "center", my: 1 }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}
