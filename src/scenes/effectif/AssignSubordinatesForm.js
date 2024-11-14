import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Typography, Grid } from '@mui/material';
import { fetchDataFromAPI, postDataToAPI } from '../../api';

const AssignSubordinatesForm = () => {
  const [managers, setManagers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedSubordinates, setSelectedSubordinates] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetchDataFromAPI('/effectif/agent');
        console.log('Réponse de l\'API:', response);
        if (response.data.results && Array.isArray(response.data.results)) {
          setAgents(response.data.results);
        } else {
          console.error('La réponse de l\'API pour les agents n\'est pas valide:', response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des agents:', error);
      }
    };

    fetchAgents();
  }, []);

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const handleSubordinateChange = (event) => {
    setSelectedSubordinates(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Affichage des valeurs de manager_id et subalternes avant l'appel à l'API
    console.log('manager_id', selectedManager);
    console.log('subalternes', selectedSubordinates);
    try {
      await postDataToAPI('/effectif/agent/assign_subordinates/', {
        manager_id: selectedManager,
        subalternes: selectedSubordinates,
      });
    
      setSnackbarMessage('Subalternes assignés avec succès');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Erreur lors de l\'assignation des subalternes:', error);
      setSnackbarMessage('Erreur lors de l\'assignation des subalternes');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Assigner des Subalternes
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Manager</InputLabel>
              <Select
                value={selectedManager}
                onChange={handleManagerChange}
                label="Manager"
              >
                {agents.length > 0 ? (
                  agents.map(agent => (
                    <MenuItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Aucun agent disponible</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>N-1</InputLabel>
              <Select
                multiple
                value={selectedSubordinates}
                onChange={handleSubordinateChange}
                renderValue={(selected) => selected.map(id => agents.find(agent => agent.id === id)?.name).join(', ')}
                label="Subalternes"
              >
                {agents.length > 0 ? (
                  agents.map(agent => (
                    <MenuItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Aucun agent disponible</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '10px 20px',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              '&:hover': {
                backgroundColor: 'primary.dark',
                boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)',
              },
            }}
          >
            Assigner
          </Button>
        </Box>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignSubordinatesForm;
