
// src/scenes/admin/AdminDashboard.js

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigation vers la page de gestion du module spécifique
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord Administrateur
      </Typography>
      <Grid container spacing={3}>
        {/* Card pour Training */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderLeft: "5px solid #1976D2",
              mb: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">Gestion des Formations</Typography>
              <Typography variant="body2" color="textSecondary">
                Voir et gérer toutes les formations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate('/admin/training')}
                sx={{ mt: 2 }}
              >
                Voir Détails
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card pour Effectif */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderLeft: "5px solid #388E3C",
              mb: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">Gestion des Effectifs</Typography>
              <Typography variant="body2" color="textSecondary">
                Voir et gérer les effectifs des employés.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate('/admin/effectif')}
                sx={{ mt: 2 }}
              >
                Voir Détails
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card pour Request */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderLeft: "5px solid #F57C00",
              mb: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">Gestion des Demandes</Typography>
              <Typography variant="body2" color="textSecondary">
                Voir et gérer toutes les demandes soumises.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate('/admin/request')}
                sx={{ mt: 2 }}
              >
                Voir Détails
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

