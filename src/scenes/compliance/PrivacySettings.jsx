import React, { useState } from "react";
import { Box, Typography, FormControlLabel, Checkbox, Snackbar, Alert, Button } from "@mui/material";

const PrivacySetting = () => {
  const [settings, setSettings] = useState({
    encryptData: true,
    trackLogin: true,
    shareData: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Paramètres de Confidentialité
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.encryptData}
            onChange={handleChange}
            name="encryptData"
          />
        }
        label="Chiffrer les Données des Utilisateurs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.trackLogin}
            onChange={handleChange}
            name="trackLogin"
          />
        }
        label="Suivre les Connexions des Utilisateurs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.shareData}
            onChange={handleChange}
            name="shareData"
          />
        }
        label="Partager les Données avec des Partenaires Tiers"
      />
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          Paramètres mis à jour.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PrivacySetting;
