import { Add, Download } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useModalStore } from "../store";
import CustomPagination from "./CustomPagination";
import { downloadDataTable } from "../helpers";

const modalKey = "create-enterprise";

const CustomFooter = () => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <>
      <Divider />
      <CustomPagination />
      <Divider />
      <Button
        onClick={() => openModal(modalKey, true)}
        variant="text"
        color="primary"
        endIcon={<Add />}
      >
        Agregar nueva empresa
      </Button>
    </>
  );
};

export const TableCustom = ({ rows = [], cols = [], loading = false }) => {
  return (
    <Box>
      <Button
        disabled={rows.length === 0}
        fullWidth
        onClick={() =>
          downloadDataTable(
            [{ sheetName: "Empresas", rows, cols }],
            "empresa-data"
          )
        }
        sx={{ mb: 2 }}
        variant="outlined"
        endIcon={<Download />}
      >
        Descargar archivo.xlsx
      </Button>
      <DataGrid
        loading={loading}
        columns={cols}
        rows={rows}
        slots={{
          footer: CustomFooter,
        }}
      />
    </Box>
  );
};
