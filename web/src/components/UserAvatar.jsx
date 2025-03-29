import React, { useState } from "react";
import { useAuthContext } from "../hooks";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";

export const UserAvatar = () => {
  const { user, logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Box display="flex" sx={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1 }} />
      <Tooltip title="Cuenta">
        <Button
          sx={{ alignSelf: "flex-end", textTransform: "none" }}
          variant="text"
          onClick={handleMenuOpen}
          endIcon={<Avatar alt={user?.email} src={user?.avatarUrl} />}
        >
          <Typography color="black" variant="body1" sx={{ marginRight: 2 }}>
            {user?.email}
          </Typography>
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </Box>
  );
};
