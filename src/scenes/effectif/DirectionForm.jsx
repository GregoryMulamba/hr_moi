import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { postDataToAPI, updateDataToAPI } from '../../api';

const initialFormData = {
  id: '',
  name: '',
  short_name: '',
  description: '',
};

const DirectionForm = ({
  formData: initialFormDataProp,
  handleInputChange,
  handleFormSubmit,
  openDialog,
  handleCloseDialog,
  editMode,
  onFormSubmitSuccess,  // Ajout de la prop pour notifier le parent du succès
}) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp); // Met à jour les données du formulaire en mode édition
    }
  }, [editMode, initialFormDataProp]);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
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
      onFormSubmitSuccess();  // Notifie le parent après soumission réussie
      handleCloseDialog(); 
      setFormData(initialFormData); 
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
            onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
            variant="outlined"
            required
          />
          <TextField
            label="Short name"
            name="short_name"
            value={formData.short_name}
            onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
            variant="outlined"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
            variant="outlined"
          />
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
