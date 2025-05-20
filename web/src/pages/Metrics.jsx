import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services";

const chartSetting = {
  xAxis: [
    {
      label: "Vistas",
    },
  ],
  height: 400,
  layout: "horizontal",
};

const BarChartComponent = ({ queryKey, collection, type, dataKey, color }) => {
  const {
    data = [],
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: getMetrics,
    meta: { limit: 10, collection, type },
  });

  return (
    <BarChart
      loading={isFetching || isRefetching}
      dataset={data}
      yAxis={[{ scaleType: "band", dataKey }]}
      series={[{ dataKey: "vistas", label: "Vistas", color }]}
      {...chartSetting}
    />
  );
};

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
      {/* <BarChart
        dataset={dataMovies}
        yAxis={[{ scaleType: "band", dataKey: "titulo" }]}
        series={[{ dataKey: "vistas", label: "Vistas", color: "#1976d2" }]}
        {...chartSetting}
      /> */}

      <Typography variant="h4">Comerciales más vistos</Typography>
      <BarChartComponent
        collection={"promotion"}
        color={"#74D2F7"}
        dataKey={"publicidad"}
        queryKey={"metric-promotion"}
        type={"banner"}
      />
    </Box>
  );
};

export default Metrics;
