import { Alert, Box, Button } from "@mui/material";
import { TableCustom } from "../components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getEnterprises } from "../services";
import { useMemo } from "react";

const rows = [
  {
    id: 1,
    name: "Empresa A",
    status: "Activo",
    updatedAt: new Date("2025-05-01T10:30:00").toLocaleDateString(),
  },
  {
    id: 2,
    name: "Empresa B",
    status: "Inactivo",
    updatedAt: new Date("2025-05-08T15:00:00").toLocaleDateString(),
  },
  {
    id: 3,
    name: "Empresa C",
    status: "Pendiente",
    updatedAt: new Date("2025-05-10T08:45:00").toLocaleDateString(),
  },
  {
    id: 4,
    name: "Empresa D",
    status: "Activo",
    updatedAt: new Date("2025-05-05T11:15:00").toLocaleDateString(),
  },
  {
    id: 5,
    name: "Empresa E",
    status: "Inactivo",
    updatedAt: new Date("2025-04-30T09:00:00").toLocaleDateString(),
  },
  {
    id: 6,
    name: "Empresa F",
    status: "Pendiente",
    updatedAt: new Date("2025-05-07T14:30:00").toLocaleDateString(),
  },
  {
    id: 7,
    name: "Empresa G",
    status: "Activo",
    updatedAt: new Date("2025-05-02T12:00:00").toLocaleDateString(),
  },
  {
    id: 8,
    name: "Empresa H",
    status: "Inactivo",
    updatedAt: new Date("2025-05-09T16:45:00").toLocaleDateString(),
  },
  {
    id: 9,
    name: "Empresa I",
    status: "Pendiente",
    updatedAt: new Date("2025-05-03T10:00:00").toLocaleDateString(),
  },
  {
    id: 10,
    name: "Empresa J",
    status: "Activo",
    updatedAt: new Date("2025-05-06T13:20:00").toLocaleDateString(),
  },
  {
    id: 11,
    name: "Empresa K",
    status: "Inactivo",
    updatedAt: new Date("2025-05-04T17:00:00").toLocaleDateString(),
  },
  {
    id: 12,
    name: "Empresa L",
    status: "Pendiente",
    updatedAt: new Date("2025-05-01T08:30:00").toLocaleDateString(),
  },
  {
    id: 13,
    name: "Empresa M",
    status: "Activo",
    updatedAt: new Date("2025-05-08T09:50:00").toLocaleDateString(),
  },
  {
    id: 14,
    name: "Empresa N",
    status: "Inactivo",
    updatedAt: new Date("2025-05-02T10:10:00").toLocaleDateString(),
  },
  {
    id: 15,
    name: "Empresa O",
    status: "Pendiente",
    updatedAt: new Date("2025-05-03T11:25:00").toLocaleDateString(),
  },
  {
    id: 16,
    name: "Empresa P",
    status: "Activo",
    updatedAt: new Date("2025-05-04T15:40:00").toLocaleDateString(),
  },
  {
    id: 17,
    name: "Empresa Q",
    status: "Inactivo",
    updatedAt: new Date("2025-05-06T12:10:00").toLocaleDateString(),
  },
  {
    id: 18,
    name: "Empresa R",
    status: "Pendiente",
    updatedAt: new Date("2025-05-07T09:35:00").toLocaleDateString(),
  },
  {
    id: 19,
    name: "Empresa S",
    status: "Activo",
    updatedAt: new Date("2025-05-09T11:50:00").toLocaleDateString(),
  },
  {
    id: 20,
    name: "Empresa T",
    status: "Inactivo",
    updatedAt: new Date("2025-05-10T14:15:00").toLocaleDateString(),
  },
];

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
        gap: 2,
      })}
    >
      <Alert
        severity="error"
        action={<Button variant="contained">Actualizar todo</Button>}
      >
        Hay (3) dispositivos pendientes por actualizar
      </Alert>
      {!rows?.length ? (
        <Alert
          severity="info"
          action={<Button variant="contained">Agregar empresa</Button>}
        >
          No se encuetran empresas
        </Alert>
      ) : (
        <TableCustom cols={cols} rows={rows} loading={isFetching} />
      )}
    </Box>
  );
};

export default Enterprise;
