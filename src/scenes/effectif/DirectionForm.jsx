import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { postDataToAPI, updateDataToAPI, fetchDataFromAPI } from '../../api';

const initialFormData = {
  id: '',
  name: '',
  short_name: '',
  hrbp_id: '',
  is_directeur: '',
  description: '',
};

const DirectionForm = ({
  formData: initialFormDataProp,
  openDialog,
  handleCloseDialog,
  editMode,
  onFormSubmitSuccess,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Charge les agents disponibles depuis l'API pour le champ hrbp_id
    const fetchAgentData = async () => {
      try {
        const response = await fetchDataFromAPI('/effectif/agent/');
        setAgents(response.data.results || []); // Remplir la liste des agents
      } catch (error) {
        console.error('Erreur lors du chargement des agents :', error);
      }
    };

    fetchAgentData();

    // Met à jour les données du formulaire en mode édition
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp);
    }
  }, [editMode, initialFormDataProp]);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await updateDataToAPI(`/effectif/direction/${formData.id}/`, formData);
      } else {
        await postDataToAPI('/effectif/direction/creer_direction/', formData);
      }
      onFormSubmitSuccess(); // Notifie le parent après soumission réussie
      handleCloseDialog();
      setFormData(initialFormData); // Réinitialise le formulaire
    } catch (error) {
      console.error('Erreur lors de la soumission de la direction :', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Direction' : 'Ajouter Direction'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField
            label="Nom"
            name="name"
            value={formData.name}
            onChange={handleFormInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Short name"
            name="short_name"
            value={formData.short_name}
            onChange={handleFormInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormInputChange}
            variant="outlined"
          />
          
          {/* Sélecteur d'agent pour hrbp_id */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Agent (HRBP)</InputLabel>
            <Select
              label="Agent (HRBP)"
              name="hrbp_id"
              value={formData.hrbp_id}
              onChange={handleFormInputChange}
              required
            >
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Champ is_directeur (true/false) */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Directeur</InputLabel>
            <Select
              label="Directeur"
              name="is_directeur"
              value={formData.is_directeur}
              onChange={handleFormInputChange}
              required
            >
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {editMode ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DirectionForm;
