
// src/scenes/admin/TrainingAdmin.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TrainingList from '../training/TrainingList';
import TrainingForm from '../training/TrainingForm';

const TrainingAdmin = () => {
  const [openForm, setOpenForm] = useState(false);
  const [trainings, setTrainings] = useState([]);

  // Simulation du fetch des données des formations
  useEffect(() => {
    // Remplacer par un fetch API si nécessaire
    setTrainings([]);
  }, []);

  // Ajout ou modification d'une formation
  const handleAddTraining = (newTraining) => {
    setTrainings([...trainings, { ...newTraining, id: Date.now() }]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestion des Formations
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Ajouter une Formation
      </Button>
      <TrainingList trainings={trainings} setTrainings={setTrainings} />

      {/* Formulaire pour ajouter/modifier une formation */}
      <TrainingForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        addTraining={handleAddTraining}
      />
    </Box>
  );
};

export default TrainingAdmin;
