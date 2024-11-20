import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from '../../api';

const initialFormData = {
  id: '',
  titre: '',
  date_debut: '',
  date_fin: '',
  stream: '',
  mode: '',
  categorie: '',
  description: '',
  cible: '',
};

const TrainingForm = ({
  formData: initialFormDataProp,
  handleCloseDialog,
  openDialog,
  editMode,
  onFormSubmitSuccess,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [streamOptions, setStreamOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [categorieOptions, setCategorieOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp);
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetchDataFromAPI('/formation/formation/get-form-choices/');
        const { stream, mode, categorie } = response.data;

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };

        setStreamOptions(transformChoices(stream || []));
        setModeOptions(transformChoices(mode || []));
        setCategorieOptions(transformChoices(categorie || []));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données de formation :', error);
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
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.titre) {
      newErrors.titre = 'Le titre est requis';
      valid = false;
    }
    if (!formData.stream) {
      newErrors.stream = 'Le stream est requis';
      valid = false;
    }
    if (!formData.mode) {
      newErrors.mode = 'Le mode est requis';
      valid = false;
    }
    if (!formData.categorie) {
      newErrors.categorie = 'La catégorie est requise';
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = 'La description est requise';
      valid = false;
    }
    if (!formData.cible) {
      newErrors.cible = 'La cible est requise';
      valid = false;
    }
    if (!formData.date_debut) {
      newErrors.date_debut = 'La date de début est requise';
      valid = false;
    }
    if (!formData.date_fin) {
      newErrors.date_fin = 'La date de fin est requise';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (editMode) {
        await updateDataToAPI(`/formation/formation/${formData.id}/`, formData);
      } else {
        await postDataToAPI('/formation/formation/creer%20formation/', formData);
      }
      if (onFormSubmitSuccess) {
        onFormSubmitSuccess();
      }
      handleCloseDialog();
      setFormData(initialFormData);
    } catch (error) {
      console.error('Erreur lors de la soumission de la formation :', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Formation' : 'Ajouter Formation'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          {/* Les champs du formulaire */}
          <TextField
            label="Titre"
            name="titre"
            value={formData.titre}
            onChange={handleFormInputChange}
            variant="outlined"
            required
            error={!!errors.titre}
            helperText={errors.titre}
          />
          {/* Autres champs comme Stream, Mode, Catégorie */}
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

export default TrainingForm;
