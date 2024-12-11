import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI } from '../../api';
import { useNavigate } from 'react-router-dom';

const RequestForm = () => {
  const [open, setOpen] = useState(false);
  const [typeDemande, setTypeDemande] = useState('');
  const [description, setDescription] = useState('');
  const [fichierJoint, setFichierJoint] = useState(null);
  const [typesDemande, setTypesDemande] = useState([]);
  const [loading, setLoading] = useState(false);

  // États pour la validation
  const [errors, setErrors] = useState({
    typeDemande: false,
    description: false,
  });

  // États pour le Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypesDemande = async () => {
      try {
        const typesResponse = await fetchDataFromAPI('/demande/TypeDemande/get_type_demande/');
        setTypesDemande(typesResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des types de demande:', error);
        handleSnackbarOpen('Erreur de chargement des données.', 'error');
      }
    };

    fetchTypesDemande();
  }, []);

  // Fonction pour ouvrir le Snackbar
  const handleSnackbarOpen = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Fonction pour fermer le Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Fonction pour soumettre la demande
  const handleSubmit = async () => {
    let formIsValid = true;
    let formErrors = { ...errors };
  
    // Vérifier les champs obligatoires
    if (!typeDemande) {
      formIsValid = false;
      formErrors.typeDemande = true;
    }
  
    if (!description) {
      formIsValid = false;
      formErrors.description = true;
    }
  
    setErrors(formErrors);
  
    if (!formIsValid) {
      handleSnackbarOpen('Veuillez remplir tous les champs obligatoires.', 'warning');
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
    formData.append('type_demande', typeDemande);
    formData.append('description', description);
    
    // Vérifiez ici si un fichier est sélectionné avant de l'ajouter
    if (fichierJoint) {
      formData.append('fichier_joint', fichierJoint);
    }
  
    try {
      await postDataToAPI('/demande/Demande/creer_demande/', formData);
  
      handleSnackbarOpen('Demande créée avec succès !', 'success');
      setOpen(false); // Fermer le formulaire
  
      // Réinitialiser les champs du formulaire après soumission réussie
      setTypeDemande('');
      setDescription('');
      setFichierJoint(null);
  
      // Réinitialiser l'état des erreurs
      setErrors({
        typeDemande: false,
        description: false,
      });
  
    } catch (error) {
      if (error.response) {
        const errorCode = error.response.status;
  
        if (errorCode === 400) {
          handleSnackbarOpen(
            'Les données fournies ne sont pas correctes. Veuillez vérifier votre saisie.',
            'error'
          );
        } else if (errorCode === 403) {
          handleSnackbarOpen(
            "Vous n'êtes pas autorisé à faire cette demande, car vous ne faites pas partie d'un groupe associé à ce type de demande.",
            'error'
          );
        } else {
          handleSnackbarOpen('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
        }
      } else {
        handleSnackbarOpen(
          'Échec de la création de la demande. Vérifiez votre connexion.',
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Créer une Demande
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type de demande <span style={{ color: 'red' }}>*</span></InputLabel>
            <Select
              value={typeDemande}
              onChange={(e) => setTypeDemande(e.target.value)}
              label="Type de demande"
              error={errors.typeDemande}
            >
              {typesDemande.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.typeDemande && (
            <div style={{ color: 'red', fontSize: '0.875rem' }}>
              Ce champ est obligatoire.
            </div>
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Description "
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description && "Ce champ est obligatoire."}
          />

          <Button variant="outlined" component="label" fullWidth>
            Ajouter un document
            <input
              type="file"
              hidden
              onChange={(e) => setFichierJoint(e.target.files[0])}
            />
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? 'Envoi...' : 'Soumettre'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour afficher les messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RequestForm;
