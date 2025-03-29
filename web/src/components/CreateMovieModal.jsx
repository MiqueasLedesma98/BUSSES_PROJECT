import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { useModalStore } from "../store";
import { useFetch } from "../hooks";

const CreateMovieModal = () => {
  const open = useModalStore((store) => store.modals?.createMovie);
  const close = useModalStore((store) => store.closeModal);

  // eslint-disable-next-line no-unused-vars
  const { data, loading } = useFetch({
    url: "/categories",
    shouldFetch: !!open,
  });

  return (
    <Dialog
      open={open}
      onClose={() => close("createMovie")}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Paso 1: Carga tu archivo en español
        </Typography>
        <Button variant="text" onClick={() => close("createMovie")}>
          Cerrar
        </Button>
      </DialogTitle>

      <DialogContent>
        {/* Barra de Progreso */}
        <LinearProgress variant="determinate" value={30} sx={{ mb: 2 }} />

        {/* Área de Carga */}
        <Box
          sx={{
            border: "2px dashed #aaa",
            borderRadius: 2,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa",
            textAlign: "center",
            mb: 3,
          }}
        >
          <Typography>Suelta aquí los archivos</Typography>
        </Box>

        {/* Inputs */}
        <TextField
          fullWidth
          label="Nombre de la película"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Select fullWidth defaultValue="Drama">
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Acción">Acción</MenuItem>
            <MenuItem value="Comedia">Comedia</MenuItem>
          </Select>

          <TextField fullWidth label="Año" type="number" variant="outlined" />
        </Box>

        <TextField
          fullWidth
          label="Descripción"
          variant="outlined"
          multiline
          rows={3}
        />
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#A5C9FF", color: "#fff" }}
        >
          Ir a paso 2
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMovieModal;
