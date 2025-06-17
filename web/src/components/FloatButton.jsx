import { CloudUpload } from "@mui/icons-material";
import { SpeedDial, Tooltip } from "@mui/material";

const FloatButton = () => {
  return (
    <Tooltip
      title="Crear nueva versión"
      sx={{
        placeContent: "center",
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
      }}
    >
      <SpeedDial ariaLabel="Subir nueva versión" icon={<CloudUpload />} />
    </Tooltip>
  );
};

export default FloatButton;
