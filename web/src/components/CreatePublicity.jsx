import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useModalStore } from "../store";
import { Close, Upload } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { DropZone } from "./DropZone";
import { useMutation } from "@tanstack/react-query";
import { uploadPublicity } from "../services";
import { enqueueSnackbar } from "notistack";

const modalKey = "create-publicity";

const CreatePublicity = () => {
  const open = useModalStore((s) => s.modals[modalKey]);
  const close = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);

  const { mutate } = useMutation({
    mutationKey: [modalKey],
    mutationFn: uploadPublicity,
    onSuccess: () => {
      openModal("success", {
        redir: "/dashboard/advertising",
        text: "Exíto",
      });
      enqueueSnackbar("Se creo correctamente", { variant: "success" });
      close(modalKey);
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: "error" }),
  });

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={() => close(modalKey)}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="span">
          Carga tu archivo
        </Typography>

        <Button variant="text" onClick={() => close(modalKey)}>
          <Close />
        </Button>
      </DialogTitle>
      <Formik
        initialValues={{
          title: "",
          lang: "",
          media: null,
          type: "video",
        }}
        onSubmit={mutate}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <DropZone
                fieldKey="media"
                file={values.media}
                setFieldValue={setFieldValue}
                accept={{ "video/mp4": [".mp4"] }}
              />
              <TextField
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFieldValue("media", e.target.files[0])}
              />
              <TextField
                type="text"
                fullWidth
                name="title"
                label="Titulo"
                placeholder="Publicidad de empresa"
                size="small"
                required
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
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
            </DialogContent>
            <DialogActions>
              <Button startIcon={<Upload />} type="submit">
                Subir
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreatePublicity;
