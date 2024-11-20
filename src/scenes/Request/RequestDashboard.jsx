// src/scenes/request/RequestDashboard.js

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import RequestList from './RequestList';
import RequestForm from './RequestForm';

const RequestDashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [requests, setRequests] = useState([]);

  // Fonction pour ajouter une nouvelle demande
  const addRequest = (newRequest) => {
    setRequests([...requests, { ...newRequest, id: Date.now(), status: 'En attente' }]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord des Demandes
      </Typography>
     
      
      <RequestList requests={requests} setRequests={setRequests} />

      {/* Formulaire pour ajouter une demande */}
      {openForm && (
        <RequestForm
          open={openForm}
          onClose={() => setOpenForm(true)}
          addRequest={addRequest}
        />
      )}
    </Box>
  );
};

export default RequestDashboard;
