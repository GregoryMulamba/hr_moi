import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  AccountCircleOutlined as ProfileIcon,
  LogoutOutlined as LogoutIcon,
  NotificationsOutlined as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";

const Topbar = ({ userName, role, setUserName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    "Nouvelle formation ajoutée.",
    "Demande de congé approuvée.",
    "Mise à jour des paramètres RH.",
  ]);

  // Gérer l'ouverture du menu utilisateur
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Fermer le menu utilisateur
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    setUserName("");
    localStorage.removeItem("userRole");
    window.location.reload();
  };

  // Suppression des notifications (simulation)
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: colors.primary[500],
        color: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Section Gauche - Nom d'utilisateur et rôle */}
      <Typography variant="h6" color="inherit">
        {userName ? `${userName} (${role.toUpperCase()})` : "Bienvenue"}
      </Typography>

      {/* Section Droite - Notifications et Menu Utilisateur */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            sx={{ color: "white" }}
            onClick={() => alert("Cliqué sur Notifications")}
          >
            <NotificationsIcon fontSize="large" />
            {notifications.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 10,
                  height: 10,
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              />
            )}
          </IconButton>
        </Tooltip>

        {/* Menu Utilisateur */}
        <Tooltip title="Menu Utilisateur">
          <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
            <ProfileIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            mt: 1,
            "& .MuiMenuItem-root:hover": {
              backgroundColor: colors.primary[300],
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <SettingsIcon sx={{ mr: 1 }} />
            <Typography>Paramètres</Typography>
          </MenuItem>
          <MenuItem onClick={clearNotifications}>
            <NotificationsIcon sx={{ mr: 1 }} />
            <Typography>Effacer Notifications</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            <Typography>Déconnexion</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
