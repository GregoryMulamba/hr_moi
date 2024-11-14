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
    type_contrat: '',
    is_active: '',
};

const ContratForm = ({
  formData: initialFormDataProp,
  handleInputChange,
  handleFormSubmit,
  openDialog,
  handleCloseDialog,
  editMode
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [type_contratOptions, setTypeContratOptions] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  console.log('type contrat: ', type_contratOptions);

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp); // Met à jour les données du formulaire en mode édition
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetchDataFromAPI('/effectif/contrat/get_type_contrat_choices/');
        const { type_contrat } = response.data;

        console.log("API response data:", response.data); // Ajout d'un log pour vérifier la structure des données

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };
        setTypeContratOptions(transformChoices(type_contrat || []));
        setLoading(false); // Arrête le chargement après avoir récupéré les données
      } catch (error) {
        console.error('Erreur lors du chargement des données du contrat :', error);
        setLoading(false); // En cas d'erreur, arrête le chargement
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
        await updateDataToAPI(`/effectif/contrat/${formData.id}/`, formData); // Mise à jour avec l'ID
      } else {
        await postDataToAPI('/effectif/contrat/creer_contrat/', formData); // Ajout
      }
      handleCloseDialog(); // Utilise la prop pour fermer la boîte de dialogue
      setFormData(initialFormData); // Réinitialise le formulaire après soumission
    } catch (error) {
      console.error('Erreur lors de la soumission du contrat :', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Contrat' : 'Ajouter Contrat'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField
            select
            label="Type contrat"
            name="type_contrat"
            value={formData.type_contrat}
            onChange={handleFormInputChange} 
            variant="outlined"
            required
          >
            {!loading && type_contratOptions.length > 0 ? (
              type_contratOptions.map(option => (
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
