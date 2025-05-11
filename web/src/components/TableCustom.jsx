import { Download } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const TableCustom = ({ rows = [], cols = [] }) => {
  return (
    <>
      <Button variant="outlined" endIcon={<Download />}>
        Descargar archivo.xlsx
      </Button>
      <DataGrid hide hideFooter columns={cols} rows={rows} />
    </>
  );
};
