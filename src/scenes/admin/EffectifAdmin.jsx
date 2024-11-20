// src/scenes/admin/EffectifAdmin.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import EffectifList from '../effectif/EffectifList';
import EffectifForm from '../effectif/EffectifForm';

const EffectifAdmin = () => {
  const [openForm, setOpenForm] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Simulation du fetch des données des effectifs
  useEffect(() => {
    // Remplacer par un fetch API si nécessaire
    setEmployees([]);
  }, []);

  // Ajout ou modification d'un employé
  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestion des Effectifs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Ajouter un Employé
      </Button>
      <EffectifList employees={employees} setEmployees={setEmployees} />

      {/* Formulaire pour ajouter/modifier un employé */}
      <EffectifForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        addEmployee={handleAddEmployee}
      />
    </Box>
  );
};

export default EffectifAdmin;
