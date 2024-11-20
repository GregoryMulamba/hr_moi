import React, { useState } from "react";
import {
  Box, IconButton,Typography,InputBase,Badge,Menu,MenuItem,useTheme} from "@mui/material";
import {
  HomeOutlined as HomeIcon, NotificationsOutlined as NotificationsIcon, AccountCircleOutlined as ProfileIcon,LogoutOutlined as LogoutIcon,Search as SearchIcon,} from "@mui/icons-material";
import { tokens } from "../../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);

  // Gestion du menu utilisateur
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      className="topbar"
      sx={{
        backgroundColor: colors.primary[500],
        height: "60px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
   

      {/* Center Section (Search Bar) */}
      <Box
        display="flex"
        alignItems="center"
        backgroundColor={colors.primary[400]}
        borderRadius="5px"
        px={2}
        py={0.5}
      >
        <SearchIcon sx={{ color: "white", mr: 1 }} />
        <InputBase
          placeholder="Rechercher..."
          sx={{
            color: "black",
            "::placeholder": { color: "white", opacity: 0.8 },
          }}
        />
      </Box>

      {/* Right Section */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Notifications */}
        <IconButton aria-label="Notifications" sx={{ color: "white" }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profile and Logout */}
        <IconButton
          aria-label="User Menu"
          onClick={handleMenuOpen}
          sx={{ color: "white" }}
        >
          <ProfileIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 1 }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ProfileIcon sx={{ mr: 1 }} />
            Profil
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <LogoutIcon sx={{ mr: 1 }} />
            Déconnexion
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
