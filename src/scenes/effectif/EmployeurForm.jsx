import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from '../../api';

const initialFormData = {
    id: '',
    type_employeur: '',
    is_active: '',
};

const ContratForm = ({
  formData: initialFormDataProp,
  openDialog,
  handleCloseDialog,
  editMode
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [tyoe_employeurOptions, setTypeContratOptions] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  console.log('type employeur: ', tyoe_employeurOptions);

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp); // Met à jour les données du formulaire en mode édition
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetchDataFromAPI('/effectif/employeur/get_type_employeur_choices/');
        const { type_employeur } = response.data;

        console.log("API response data:", response.data); 

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };
        setTypeContratOptions(transformChoices(type_employeur || []));
        setLoading(false); 
      } catch (error) {
        console.error('Erreur lors du chargement des données du employeur :', error);
        setLoading(false); 
      }
    };

    fetchTrainingData();
  }, []);

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
        await updateDataToAPI(`/effectif/employeur/${formData.id}/`, formData); 
      } else {
        await postDataToAPI('/effectif/employeur/', formData); 
      }
      handleCloseDialog(); 
      setFormData(initialFormData); 
    } catch (error) {
      console.error('Erreur lors de la soumission du employeur :', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Contrat' : 'Ajouter Contrat'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField
            select
            label="Type employeur"
            name="type_employeur"
            value={formData.type_employeur}
            onChange={handleFormInputChange} 
            variant="outlined"
            required
          >
            {!loading && tyoe_employeurOptions.length > 0 ? (
              tyoe_employeurOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading...</MenuItem>
            )}
          </TextField>
         
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

export default ContratForm;
