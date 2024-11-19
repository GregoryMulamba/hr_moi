import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Topbar = ({ toggleSidebar }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: "primary.main",
        height: "60px",
        color: "white",
      }}
    >
      <IconButton onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">Tableau de Bord</Typography>
      <IconButton>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
};

export default Topbar;
