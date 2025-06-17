import { Add, Download } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useModalStore } from "../store";

const modalKey = "new-enterprise";

// TODO: agregar el modal para crear empresas

const CustomFooter = () => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <>
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

export const TableCustom = ({ rows = [], cols = [] }) => {
  return (
    <>
      <Button variant="outlined" endIcon={<Download />}>
        Descargar archivo.xlsx
      </Button>
      <DataGrid
        columns={cols}
        rows={rows}
        slots={{
          footer: CustomFooter,
        }}
      />
    </>
  );
};
