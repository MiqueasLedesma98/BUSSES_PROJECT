import { Box, Typography } from "@mui/material";
import MovieImg from "../assets/card-img.png"
export function Card() {
  return (
    <Box
      sx={{
        width: "350px",
        height: "250px",
        backgroundColor: "white",
        borderRadius: "0px 0px 20px 20px",
      }}
    >
      <Box
        sx={{
          height: "180px",
          width: "100%",
          backgroundImage: `url(${MovieImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px 20px 0px 0px",
        }}
      ></Box>
      <Box
        sx={{
          height: "70px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "3px",
          paddingLeft: "15px",
        }}
      >
        <Typography variant="subtitle2" fontWeight={700}>
          Moda en Parys
        </Typography>
        <Typography variant="body2">2022 | Action comedy</Typography>
      </Box>
    </Box>
  );
}
