import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import MovieImg from "../assets/card-img.png";

export function Card() {
  return (
    <MuiCard
      sx={{
        width: "350px",
        borderRadius: "20px",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={MovieImg}
        alt="Movie Image"
        sx={{
          borderRadius: "20px 20px 0 0",
        }}
      />
      <CardContent
        sx={{
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
      </CardContent>
    </MuiCard>
  );
}
