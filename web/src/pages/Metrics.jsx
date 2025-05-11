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

const data = [
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
      })}
    >
      <Typography variant="h4">Películas más vistas</Typography>
      <BarChart
        slots={{}}
        dataset={data}
        yAxis={[{ scaleType: "band", dataKey: "publicidad" }]}
        series={[{ dataKey: "vistas", label: "Vistas", color: "#1976d2" }]}
        {...chartSetting}
      />
      <Typography variant="h4">Comerciales más vistos</Typography>
      <BarChart
        dataset={data}
        yAxis={[{ scaleType: "band", dataKey: "publicidad" }]}
        series={[{ dataKey: "vistas", label: "Vistas", color: "#1976d2" }]}
        {...chartSetting}
      />
    </Box>
  );
};

export default Metrics;
