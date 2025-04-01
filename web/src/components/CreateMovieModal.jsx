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
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Close, Folder, Image } from "@mui/icons-material";
import React, { useState } from "react";
import { useModalStore } from "../store";
import { Form, Formik } from "formik";
import { DropZone } from "./DropZone";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/list.query";

const CreateMovieModal = ({}) => {
  const open = useModalStore((store) => store.modals?.createMovie);
  const close = useModalStore((store) => store.closeModal);

  const { data, isLoading } = useQuery({
    queryKey: ["esp"],
    queryFn: getCategories,
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
        <Typography variant="h6" fontWeight={600} component="span">
          Paso 1: Carga tu archivo en español
        </Typography>
        <Button variant="text" onClick={() => close("createMovie")}>
          <Close />
        </Button>
      </DialogTitle>

      <Formik
        initialValues={{
          title: "",
          description: "",
          duration: "",
          categories: "",
          year: "",
          rate: "",
          file: "",
          cover: null,
        }}
        onSubmit={(values) => console.log({ values })}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              {/* Barra de Progreso */}
              <LinearProgress variant="determinate" value={30} sx={{ mb: 2 }} />

              {/* Área de Carga */}
              <DropZone file={values.media} setFieldValue={setFieldValue} />

              <Box sx={{ display: "grid", placeContent: "center" }}>
                <input
                  accept="video/mp4"
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  onChange={(e) => setFieldValue("media", e.target.files[0])}
                />
                <Button
                  sx={{ mb: 3 }}
                  onClick={() => document.getElementById("file").click()}
                >
                  <Folder />
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <input
                  required
                  accept="image/*"
                  style={{ display: "none" }}
                  id="cover"
                  type="file"
                  onChange={(e) => setFieldValue("cover", e.target.files[0])}
                />
                <Button
                  variant="outlined"
                  onClick={() => document.getElementById("cover").click()}
                  startIcon={<Image />}
                >
                  Subir Cover
                </Button>

                {values.cover && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(values.cover)}
                    sx={{
                      width: 300,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>

              {/* Inputs */}
              <TextField
                name="title"
                value={values.title}
                onChange={handleChange}
                fullWidth
                label="Nombre de la película"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Select
                  startAdornment={isLoading && <CircularProgress size={15} />}
                  fullWidth
                  value={values.categories || ""}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Categoría
                  </MenuItem>
                  {data?.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  name="year"
                  value={values.year}
                  fullWidth
                  label="Año"
                  type="number"
                  variant="outlined"
                />
              </Box>

              <TextField
                sx={{ mb: 2 }}
                type="number"
                name="duration"
                placeholder="En minutos"
                onChange={handleChange}
                value={values.duration}
                variant="outlined"
                fullWidth
                label="Duración"
              />

              <TextField
                name="description"
                value={values.description}
                onChange={handleChange}
                fullWidth
                label="Descripción"
                variant="outlined"
                multiline
                rows={3}
              />
            </DialogContent>

            <DialogActions sx={{ pb: 3, px: 3 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "#A5C9FF", color: "#fff" }}
              >
                Ir a paso 2
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateMovieModal;
