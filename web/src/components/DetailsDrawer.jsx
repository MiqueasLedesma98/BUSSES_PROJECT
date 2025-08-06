import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Typography,
} from "@mui/material";
import { useModalStore } from "../store";
import { baseURL } from "../api";
/**
 * @typedef {Object} Category
 * @property {string} name
 * @property {string} id
 */

/**
 *
 * @param {Category[]} Categories
 * @returns {string}
 */
const formatCategoryName = (Categories = []) => {
  return Categories.map(({ name }) => name).join(" - ");
};

const DetailsDrawer = () => {
  /**
   * @type {undefined | {title: string; description: string; year: string; Categories: Category[]; cover_path: string; url_path: string;}}
   */
  const DrawerProps = useModalStore((s) => s.modals?.details);

  const close = useModalStore((s) => s.closeModal);

  return (
    <Drawer
      onClose={() => close("details")}
      open={!!DrawerProps}
      anchor="bottom"
      invertedColors={false}
      variant="plain"
      size="sm"
      slotProps={{
        paper: {
          sx: {
            minHeight: "30vh",
            maxHeight: "80vh",
            backgroundImage: `url(${baseURL + DrawerProps?.cover_path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          color: "#fff",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 70%), linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0))",
        }}
      >
        <DialogTitle>{DrawerProps?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText color={"#fff"}>
            {DrawerProps?.description}
          </DialogContentText>
          <Typography sx={{ my: 2 }}>
            {formatCategoryName(DrawerProps?.Categories)}
          </Typography>
        </DialogContent>
      </Box>
    </Drawer>
  );
};

export default DetailsDrawer;
