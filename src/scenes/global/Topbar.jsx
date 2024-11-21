import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  HomeOutlined as HomeIcon,
  NotificationsOutlined as NotificationsIcon,
  AccountCircleOutlined as ProfileIcon,
  LogoutOutlined as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom"; // Utilisation pour la redirection

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la recherche
  const navigate = useNavigate(); // Utilisé pour la navigation vers une page spécifique

  // Gestion du menu utilisateur
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Fonction pour gérer la recherche
  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      // Exemple de redirection vers une page de résultats
      navigate(`/search?query=${searchTerm}`);

      // Exemple pour filtrer une liste locale
      // Vous pouvez aussi déclencher une fonction de filtrage ici
    }
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
        borderRadius="8px"
        px={2}
        py={0.5}
        sx={{
          "&:hover": {
            backgroundColor: colors.primary[300],
          },
        }}
      >
        <SearchIcon sx={{ color: "white", mr: 1 }} onClick={handleSearch} />
        <InputBase
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          sx={{
            color: "white",
            "::placeholder": { color: "white", opacity: 0.8 },
            width: "200px",
          }}
        />
      </Box>

      {/* Right Section */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Notifications */}
        <Tooltip title="Notifications" arrow>
          <IconButton aria-label="Notifications" sx={{ color: "white" }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile and Logout */}
        <Tooltip title="Menu Utilisateur" arrow>
          <IconButton
            aria-label="User Menu"
            onClick={handleMenuOpen}
            sx={{ color: "white" }}
          >
            <ProfileIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 1 }}
          PaperProps={{
            elevation: 8,
            sx: {
              backgroundColor: colors.primary[500],
              color: "white",
              minWidth: "150px",
              "& .MuiMenuItem-root:hover": {
                backgroundColor: colors.primary[400],
              },
            },
          }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <ProfileIcon sx={{ mr: 1 }} />
            <Typography>Profil</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoutIcon sx={{ mr: 1 }} />
            <Typography>Déconnexion</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
