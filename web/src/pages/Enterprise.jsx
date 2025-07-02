import { Box } from "@mui/material";
import { RenewVersion, TableCustom } from "../components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getEnterprises } from "../services";
import { useMemo } from "react";

const cols = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Nombre", width: 200 },
  {
    field: "createdAt",
    headerName: "Fecha de creación",
    width: 200,
    valueFormatter: (value) => new Date(value).toLocaleDateString(),
  },
  {
    field: "updatedAt",
    headerName: "Última actualización",
    width: 200,
    valueFormatter: (value) => new Date(value).toLocaleDateString(),
  },
];

const Enterprise = () => {
  const [searchParams] = useSearchParams();

  const { data, isFetching } = useQuery({
    queryKey: ["get-enterprises", searchParams.get("page")],
    queryFn: getEnterprises,
    meta: { page: searchParams.get("page") || 1 },
  });

  const rows = useMemo(
    () =>
      data?.results.map((company) => ({
        id: company.id,
        name: company.name,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      })) || [],
    [data]
  );

  return (
    <Box
      component="main"
      sx={({ palette }) => ({
        backgroundColor: palette.grey["100"],
        gridTemplateRows: "50px 1fr",

        gridArea: "main",
        display: "grid",
        alignItems: "flex-start",
        overflowY: "auto",
        padding: 2,
        gap: 4,
      })}
    >
      <RenewVersion />

      <TableCustom cols={cols} rows={rows} loading={isFetching} />
    </Box>
  );
};

export default Enterprise;
