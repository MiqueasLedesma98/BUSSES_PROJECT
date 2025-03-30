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
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { AttachFile, Close, Delete } from "@mui/icons-material";
import React, { useCallback, useMemo, useState } from "react";
import { useModalStore } from "../store";
import { useFetch } from "../hooks";
import { useDropzone } from "react-dropzone";

const CreateMovieModal = () => {
  const open = useModalStore((store) => store.modals?.createMovie);
  const close = useModalStore((store) => store.closeModal);
  const [file, setFile] = useState();

  // eslint-disable-next-line no-unused-vars
  const { data, loading } = useFetch({
    url: "/categories",
    shouldFetch: !!open,
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // Guardamos el archivo en el estado
    }
  }, []);

  const { getRootProps } = useDropzone({
    accept: { "video/mp4": [] },
    onDrop,
  });

  const removeFile = () => {
    setFile(null); // Eliminamos el archivo del estado
  };

  const renderFile = useMemo(() => {
    return file ? (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <video
          src={URL.createObjectURL(file)}
          controls
          style={{ width: "100%", borderRadius: 8, marginBottom: 8 }}
        />
        <CardContent>
          <Button variant="contained" endIcon={<Delete />} onClick={removeFile}>
            {file.name}
          </Button>
        </CardContent>
      </Card>
    ) : (
      <Typography>Suelta aquí los archivos</Typography>
    );
  }, [file]);

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
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent>
        {/* Barra de Progreso */}
        <LinearProgress variant="determinate" value={30} sx={{ mb: 2 }} />

        {/* Área de Carga */}
        <Box
          {...getRootProps({ className: "dropzone" })}
          sx={{
            border: "2px dashed #aaa",
            borderRadius: 2,
            minHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa",
            textAlign: "center",
            mb: 3,
          }}
        >
          {renderFile}
        </Box>

        <Box sx={{ display: "grid", placeContent: "center" }}>
          <input
            accept="video/mp4"
            style={{ display: "none" }}
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            sx={{ mb: 3 }}
            onClick={() => document.getElementById("file").click()}
          >
            <AttachFile />
          </Button>
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
