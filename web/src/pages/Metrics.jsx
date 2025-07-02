import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services";
import { useMemo, useState } from "react";
import { Download } from "@mui/icons-material";
import { downloadAsXLSX } from "../helpers";
import { RenewVersion } from "../components";

const chartSetting = {
  xAxis: [
    {
      label: "Vistas",
      dataKey: "vistas",
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
    queryKey: [queryKey, type],
    queryFn: getMetrics,
    meta: { limit: 20, collection, type },
  });

  const normalizedData = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        vistas: Number(item.vistas),
      })) || [],
    [data]
  );

  return (
    <>
      <Button
        disabled={!normalizedData.length}
        variant="outlined"
        endIcon={<Download />}
        onClick={() =>
          downloadAsXLSX(normalizedData, `${collection}-${type}-metrics.xlsx`)
        }
      >
        Descargar archivo .xlsx
      </Button>
      <BarChart
        Axis={{ dataKey: "vistas" }}
        loading={isFetching || isRefetching}
        dataset={normalizedData}
        yAxis={[{ scaleType: "band", dataKey }]}
        series={[{ dataKey: "vistas", label: "Vistas", color }]}
        {...chartSetting}
      />
    </>
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
      <RenewVersion />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 200px" }}>
        <Typography variant="h4">Películas más vistas</Typography>
        <Select
          value={topBarChar}
          onChange={(e) => setTopBarChar(e.target.value)}
        >
          {[
            { label: "Películas", value: "movie" },
            { label: "Músicas", value: "music" },
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
        type={topBarChar}
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
        type={bottomBarChar}
      />
    </Box>
  );
};

export default Metrics;
