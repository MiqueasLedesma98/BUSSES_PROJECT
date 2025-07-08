import { Alert, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shouldUpdate } from "../services";
import { useModalStore } from "../store";

export const RenewVersion = () => {
  const { data } = useQuery({
    queryKey: ["get-version"],
    queryFn: shouldUpdate,
    refetchOnWindowFocus: true,
  });

  const open = useModalStore((s) => s.openModal);

  if (data?.new)
    return (
      <Alert
        severity="warning"
        sx={{ my: 2, maxHeight: 50, height: "fit-content" }}
        action={
          <Button
            onClick={() => open("verison-modal", true)}
            variant="contained"
          >
            Crear nueva versión
          </Button>
        }
      >
        ¡Se han cargado nuevos contenidos! ¿Actualizar y crear una nueva
        versión?
      </Alert>
    );
  else return null;
};
