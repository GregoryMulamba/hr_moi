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
  onFormSubmitSuccess, // Nouvelle prop pour le callback
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
      [name]: '', // Efface l'erreur lors de la modification du champ
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Vérification des champs requis
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
      // Appel du callback de succès après la soumission du formulaire
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
          <TextField
            select
            label="Stream"
            name="stream"
            value={formData.stream}
            onChange={handleFormInputChange}
            variant="outlined"
            required
            error={!!errors.stream}
            helperText={errors.stream}
          >
            {!loading && streamOptions.length > 0 ? (
              streamOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading...</MenuItem>
            )}
          </TextField>
          <TextField
            select
            label="Mode"
            name="mode"
            value={formData.mode}
            onChange={handleFormInputChange}
            variant="outlined"
            required
            error={!!errors.mode}
            helperText={errors.mode}
          >
            {!loading && modeOptions.length > 0 ? (
              modeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading...</MenuItem>
            )}
          </TextField>
          <TextField
            select
            label="Catégorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleFormInputChange}
            variant="outlined"
            required
            error={!!errors.categorie}
            helperText={errors.categorie}
          >
            {!loading && categorieOptions.length > 0 ? (
              categorieOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading...</MenuItem>
            )}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormInputChange}
            variant="outlined"
            required
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            label="Cible"
            name="cible"
            value={formData.cible}
            onChange={handleFormInputChange}
            variant="outlined"
            type="number"
            required
            error={!!errors.cible}
            helperText={errors.cible}
          />
          <TextField
            label="Date Début"
            name="date_debut"
            type="date"
            value={formData.date_debut}
            onChange={handleFormInputChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.date_debut}
            helperText={errors.date_debut}
          />
          <TextField
            label="Date Fin"
            name="date_fin"
            type="date"
            value={formData.date_fin}
            onChange={handleFormInputChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.date_fin}
            helperText={errors.date_fin}
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

export default TrainingForm;
