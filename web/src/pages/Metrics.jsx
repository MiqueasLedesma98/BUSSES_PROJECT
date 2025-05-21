import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services";
import { useState } from "react";

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
  const [topBarChar, setTopBarChar] = useState("movie");
  const [bottomBarChar, setBottomBarChar] = useState("banner");

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
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 200px" }}>
        <Typography variant="h4">Películas más vistas</Typography>
        <Select
          value={topBarChar}
          onChange={(e) => setTopBarChar(e.target.value)}
        >
          {[
            { label: "Películas", value: "movie" },
            { label: "Musicas", value: "music" },
          ].map((item, i) => (
            <MenuItem key={item.value + i} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <BarChartComponent
        collection={"multimedia"}
        color={"#3A9DC0"}
        dataKey={"titulo"}
        type={"movie"}
        queryKey={"metric-movies"}
      />

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 200px" }}>
        <Typography variant="h4">Comerciales más vistos</Typography>
        <Select
          value={bottomBarChar}
          onChange={(e) => setBottomBarChar(e.target.value)}
        >
          {[
            { label: "Banners", value: "banner" },
            { label: "Comerciales", value: "video" },
          ].map((item, i) => (
            <MenuItem key={item.value + i} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <BarChartComponent
        collection={"promotion"}
        color={"#74D2F7"}
        dataKey={"publicidad"}
        queryKey={"metric-promotions"}
        type={"banner"}
      />
    </Box>
  );
};

export default Metrics;
