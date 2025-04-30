import React from "react";
import { useModalStore } from "../store";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { DropZone } from "./DropZone";
import { Close, FileUpload } from "@mui/icons-material";

const CreatePromotionModal = () => {
  const data = useModalStore((s) => s.modals?.createPromotion);
  const close = useModalStore((s) => s.closeModal);

  const handleClose = () => close("createPromotion");

  return (
    <Dialog open={!!data} onClose={handleClose}>
      <CardHeader
        title="Subir promociones"
        subheader={data?.title}
        action={
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        }
      />

      <Formik
        initialValues={{ lang: "", file: "", description: "" }}
        onSubmit={(props) => console.log(props)}
      >
        {({ handleChange, values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Select
                sx={{ mb: 2 }}
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
                size="small"
                fullWidth
                value={values.description}
                name="description"
                onChange={handleChange}
                label={"Descripción"}
                placeholder={"Breve información publicitaria"}
                sx={{ mb: 2 }}
              />
              <DropZone
                file={values?.file}
                fieldKey="file"
                setFieldValue={setFieldValue}
                accept={{
                  "image/png": [],
                  "image/webp": [],
                }}
              />
              <DialogActions>
                <Button
                  type="submit"
                  endIcon={<FileUpload />}
                  variant="contained"
                >
                  Subir
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreatePromotionModal;
