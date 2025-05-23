import React from "react";
import { useModalStore } from "../store";
import {
  Box,
  Button,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { DropZone } from "./DropZone";
import {
  Close,
  Delete,
  FileUpload,
  Folder,
  FolderCopy,
} from "@mui/icons-material";
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
          secondary: "",
        }}
        onSubmit={(values) => mutate({ values, data })}
      >
        {({ handleChange, values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers sx={{ display: "grid", width: 500 }}>
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
              {values?.secondary && values.secondary instanceof File ? (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxHeight: 200,
                    mb: 2,
                    overflow: "hidden",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(values.secondary)}
                    alt="Vista previa de la imagen secundaria"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    <Typography>Imagen detalles</Typography>
                    <Button
                      sx={{ mx: 2 }}
                      onClick={() => setFieldValue("secondary", "")}
                    >
                      <Delete htmlColor="error" />
                    </Button>
                  </Box>
                </Box>
              ) : null}

              <Stack direction="row" justifyContent={"center"} gap={2}>
                <Tooltip title="Banner">
                  <Button
                    onClick={() =>
                      document.getElementById("input-file-promotion").click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="input-file-promotion"
                      style={{ display: "none" }}
                      onChange={(e) => setFieldValue("file", e.target.files[0])}
                    />
                    <Folder />
                  </Button>
                </Tooltip>
                <Tooltip title="Imagen de detalles">
                  <Button
                    onClick={() =>
                      document.getElementById("input-file-secondary").click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="input-file-secondary"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFieldValue("secondary", e.target.files[0])
                      }
                    />
                    <FolderCopy />
                  </Button>
                </Tooltip>
              </Stack>

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
