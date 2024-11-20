// src/scenes/admin/RequestAdmin.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import RequestList from '../Request/RequestList';
import RequestForm from '../Request/RequestForm';

const RequestAdmin = () => {
  const [openForm, setOpenForm] = useState(false);
  const [requests, setRequests] = useState([]);

  // Simulation du fetch des données des demandes
  useEffect(() => {
    // Remplacer par un fetch API si nécessaire
    setRequests([]);
  }, []);

  // Ajout ou modification d'une demande
  const handleAddRequest = (newRequest) => {
    setRequests([...requests, { ...newRequest, id: Date.now() }]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestion des Demandes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Ajouter une Demande
      </Button>
      <RequestList requests={requests} setRequests={setRequests} />

      {/* Formulaire pour ajouter/modifier une demande */}
      <RequestForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        addRequest={handleAddRequest}
      />
    </Box>
  );
};

export default RequestAdmin;
