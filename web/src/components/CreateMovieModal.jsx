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
  CircularProgress,
} from "@mui/material";
import { Close, Folder, Image, Upload } from "@mui/icons-material";
import { useModalStore } from "../store";
import { Form, Formik } from "formik";
import { DropZone } from "./DropZone";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadMovie, getCategories } from "../services";
import { enqueueSnackbar } from "notistack";

const CreateMovieModal = ({ type = "movie" }) => {
  const strModal = type === "music" ? "createMusic" : "createMovie";
  const isMovie = type === "movie";
  const open = useModalStore((s) => s.modals[strModal]);
  const close = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    meta: { type, lang: "all" },
    queryFn: getCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [`upload-${type}`],
    mutationFn: uploadMovie,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["home-cards-movie", "home-cards-music", "movies"],
      });
      openModal("success", {
        redir: `/dashboard/content/${isMovie ? "movies" : "musics"}`,
        text: `Ir a ${isMovie ? "Peliculas" : "Musicas"}`,
      });
      close(strModal);
    },
    onError: (err) =>
      enqueueSnackbar(`A ocurrido un error: ${err.message}`, {
        variant: "error",
      }),
  });

  return (
    <Dialog open={open} onClose={() => close(strModal)} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} component="span">
          Carga tu archivo
        </Typography>
        <Button variant="text" onClick={() => close(strModal)}>
          <Close />
        </Button>
      </DialogTitle>

      <Formik
        initialValues={{
          title: "",
          description: "",
          duration: "",
          categories: "",
          lang: "",
          year: "",
          rate: "",
          media: null,
          cover: null,
          type,
        }}
        onSubmit={mutate}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
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
              <DropZone
                fieldKey="media"
                file={values.media}
                setFieldValue={setFieldValue}
                accept={
                  isMovie
                    ? { "video/mp4": [".mp4"] }
                    : { "audio/mp3": [".mp3"] }
                }
              />

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
                  accept={isMovie ? "video/mp4" : "audio/mp3"}
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
                  {type === "music" ? "Canción" : "Video"}
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
                required
                name="title"
                value={values.title}
                onChange={handleChange}
                fullWidth
                label="Nombre del archivo"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Select
                  required
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
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  required
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
                required
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
                required
                name="description"
                value={values.description}
                onChange={handleChange}
                fullWidth
                label="Descripción"
                variant="outlined"
                multiline
                rows={3}
                sx={{ mb: 2 }}
                error={values.description?.length >= 250}
                helperText={
                  values.description.length >= 250
                    ? "Maxímo 250 caracteres"
                    : ""
                }
              />

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Select
                  value={values.lang}
                  onChange={(e) => setFieldValue("lang", e.target.value)}
                  name="lang"
                  size="small"
                  required
                  fullWidth
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    Idioma
                  </MenuItem>
                  {[
                    { label: "Español", value: "esp" },
                    { label: "Ingles", value: "eng" },
                  ].map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  name="rate"
                  label="Puntuación"
                  type="number"
                  placeholder="1 - 10"
                  fullWidth
                  onChange={handleChange}
                  error={values.rate > 10 || values.rate === 0}
                  helperText={
                    values.rate > 10 || values.rate === 0
                      ? "Solo valores entre 1 y 10"
                      : ""
                  }
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ pb: 3, px: 3 }}>
              <Button
                disabled={isPending}
                startIcon={isPending ? <CircularProgress size={15} /> : null}
                endIcon={<Upload />}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ color: "#fff" }}
              >
                Enviar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateMovieModal;
