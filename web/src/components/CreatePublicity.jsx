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

// TODO: terminar modal

const modalKey = "create-publicity";

const CreatePublicity = () => {
  const open = useModalStore((s) => s.modals[modalKey]);
  const close = useModalStore((s) => s.closeModal);
  const _openModal = useModalStore((s) => s.openModal);

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
          description: "",
          duration: "",
          lang: "",
          path: null,
        }}
        onSubmit={console.log}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <DropZone
                fieldKey="path"
                file={values.path}
                setFieldValue={setFieldValue}
                accept={{ "video/mp4": [".mp4"] }}
              />

              <TextField
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFieldValue("path", e.target.files[0])}
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
