import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        gridArea: "footer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography
        display={"flex"}
        alignItems={"center"}
        alignContent={"center"}
        variant="body2"
        color="textSecondary"
      >
        Hecho por <strong style={{ margin: "0 4px" }}>make money team</strong>
        <FavoriteIcon fontSize="small" color="error" />
      </Typography>
    </Box>
  );
};

export default Footer;
