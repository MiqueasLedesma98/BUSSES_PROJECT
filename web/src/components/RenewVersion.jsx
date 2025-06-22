import { Alert, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { shouldUpdate } from "../services";

export const RenewVersion = () => {
  const { data } = useQuery({
    queryKey: ["get-version"],
    queryFn: shouldUpdate,
    refetchOnWindowFocus: true,
  });

  if (data?.new)
    return (
      <Alert
        severity="warning"
        sx={{ my: 2 }}
        action={<Button variant="contained">Crear nueva versión</Button>}
      >
        ¡Se han cargado nuevos contenidos! ¿Actualizar y crear una nueva
        versión?
      </Alert>
    );
  else return null;
};
