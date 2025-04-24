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
  CircularProgress,
} from "@mui/material";
import { Close, Folder, Image } from "@mui/icons-material";
import React from "react";
import { useModalStore } from "../store";
import { Form, Formik } from "formik";
import { DropZone } from "./DropZone";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/list.query";

const CreateMovieModal = ({}) => {
  const open = useModalStore((store) => store.modals?.createMovie);
  const close = useModalStore((store) => store.closeModal);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    meta: { type: "movie", lang: "esp" },
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
          media: null,
          cover: null,
        }}
        onSubmit={(values) => console.log({ values })}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              {/* Barra de Progreso */}
              <LinearProgress variant="determinate" value={30} sx={{ mb: 2 }} />
              {values.cover && (
                <Box
                  component="img"
                  src={URL.createObjectURL(values.cover)}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    mb: 2,
                    borderRadius: 1,
                  }}
                />
              )}
              {/* Área de Carga */}
              <DropZone file={values.media} setFieldValue={setFieldValue} />

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  accept="video/mp4"
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  onChange={(e) => setFieldValue("media", e.target.files[0])}
                />
                <Button
                  variant="outlined"
                  onClick={() => document.getElementById("file").click()}
                  startIcon={<Folder />}
                >
                  Video
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => document.getElementById("cover").click()}
                  startIcon={<Image />}
                >
                  Subir Cover
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="cover"
                  type="file"
                  onChange={(e) => setFieldValue("cover", e.target.files[0])}
                />
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
                  onChange={(e) => setFieldValue("categories", e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Categoría
                  </MenuItem>
                  {data?.results?.map((category) => (
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
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Box>

              <TextField
                sx={{ mb: 2 }}
                name="duration"
                placeholder="1h:30m"
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
