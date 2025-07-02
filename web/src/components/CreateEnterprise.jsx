import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useModalStore } from "../store";
import { Close, Save } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewEnterprise } from "../services";
import { enqueueSnackbar } from "notistack";

const modalKey = "create-enterprise";

export const CreateEnterprise = () => {
  const open = useModalStore((s) => s.modals[modalKey]);
  const close = useModalStore((s) => s.closeModal);

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [modalKey],
    mutationFn: createNewEnterprise,
    onSuccess: (data) => {
      enqueueSnackbar(data, { variant: "success" });
      client.refetchQueries();
      close(modalKey);
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: "error" }),
  });

  return (
    <Dialog open={open} onClose={() => close(modalKey)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600} component={"span"}>
          Crear empresa
        </Typography>
        <Button
          variant="text"
          onClick={() => close(modalKey)}
          sx={{ position: "absolute", top: "1em", right: "1em" }}
        >
          <Close />
        </Button>
      </DialogTitle>
      <Formik initialValues={{ name: "" }} onSubmit={mutate}>
        {({ handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <TextField
                placeholder="Empresa 1"
                label="Nombre de la empresa"
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => close(modalKey)}>Cancelar</Button>
              <Button type="submit" endIcon={<Save />}>
                Enviar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateEnterprise;
