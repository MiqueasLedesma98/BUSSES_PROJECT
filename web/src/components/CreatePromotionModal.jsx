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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPromotion } from "../services";

const CreatePromotionModal = () => {
  const data = useModalStore((s) => s.modals?.createPromotion);
  const close = useModalStore((s) => s.closeModal);
  const openModal = useModalStore((s) => s.openModal);

  const handleClose = () => close("createPromotion");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: uploadPromotion,
    mutationKey: [data?.type, data?.type_banner],
    meta: data,
    onSuccess: (_, { values, data }) => {
      openModal("success", { redir: "/dashboard/advertising" });
      queryClient.refetchQueries({
        queryKey: [values.lang, data.type, data.type_banner],
      });
    },
    onError: console.log,
  });

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
        initialValues={{
          lang: data.lang,
          file: "",
          description: "",
          title: "",
        }}
        onSubmit={(values) => mutate({ values, data })}
      >
        {({ handleChange, values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <TextField
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                name="title"
                placeholder="Titulo de la publicidad"
                label="Titulo"
                onChange={handleChange}
              />
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
