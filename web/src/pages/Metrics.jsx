import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "Vistas",
    },
  ],
  height: 400,
  layout: "horizontal",
};

const dataMovies = [
  { titulo: "Avengers: Endgame", vistas: 3000 },
  { titulo: "El Rey León", vistas: 2500 },
  { titulo: "Avatar 2", vistas: 2800 },
  { titulo: "Spider-Man: No Way Home", vistas: 3200 },
  { titulo: "Minions", vistas: 1900 },
  { titulo: "Toy Story 4", vistas: 2100 },
  { titulo: "Rápidos y Furiosos 9", vistas: 2300 },
];

const dataAdds = [
  { publicidad: "Promo Verano", vistas: 1200 },
  { publicidad: "Descuento 2x1", vistas: 950 },
  { publicidad: "Lanzamiento Producto X", vistas: 1500 },
  { publicidad: "Black Friday", vistas: 1800 },
  { publicidad: "Navidad", vistas: 1100 },
  { publicidad: "Anuncio App Móvil", vistas: 800 },
  { publicidad: "Vuelta al Cole", vistas: 1350 },
];

const Metrics = () => {
  return (
    <Box
      component="main"
      sx={({ palette }) => ({
        gridArea: "main",
        bgcolor: palette.grey[100],
        overflowY: "auto",
        display: "grid",
        p: 2,
        gap: 4,
      })}
    >
      <Typography variant="h4">Películas más vistas</Typography>
      <BarChart
        dataset={dataMovies}
        yAxis={[{ scaleType: "band", dataKey: "titulo" }]}
        series={[{ dataKey: "vistas", label: "Vistas", color: "#1976d2" }]}
        {...chartSetting}
      />

      <Typography variant="h4">Comerciales más vistos</Typography>
      <BarChart
        dataset={dataAdds}
        yAxis={[{ scaleType: "band", dataKey: "publicidad" }]}
        series={[{ dataKey: "vistas", label: "Vistas", color: "#74D2F7" }]}
        {...chartSetting}
      />
    </Box>
  );
};

export default Metrics;
