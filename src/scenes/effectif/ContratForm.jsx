import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from '../../api';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Icône pour le fichier

const initialFormData = {
  id: '',
  type_contrat: '',
  nature_contrat: '',
  filiere_metier: '',
  probation_end_date: '', // Nouvelle date de probation
  agent: '', // ID de l'agent
  date_debut: '', // Date de début
  date_fin_cdd: '', // Date de fin pour CDD
  document: '', // Le champ pour le fichier
  is_active: '',
};

const ContratForm = ({
  formData: initialFormDataProp,
  openDialog,
  handleCloseDialog,
  editMode,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [type_contratOptions, setTypeContratOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]); // Liste des agents
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp); // Met à jour les données du formulaire en mode édition
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    // Récupérer les options de type de contrat
    const fetchContractData = async () => {
      try {
        const response = await fetchDataFromAPI('/effectif/contrat/get_type_contrat_choices/');
        const { type_contrat } = response.data;
        setTypeContratOptions(type_contrat || []);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données du contrat :', error);
        setLoading(false);
      }
    };

    // Récupérer les agents
    const fetchAgentData = async () => {
      try {
        const response = await fetchDataFromAPI('/effectif/agent/');
        console.log("agent", response.data)

        setAgentOptions(response.data.results || []); // Remplir la liste des agents
      } catch (error) {
        console.error('Erreur lors du chargement des agents :', error);
      }
    };

    fetchContractData();
    fetchAgentData();
  }, []);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (editMode) {
        await updateDataToAPI(`/effectif/contrat/${formData.id}/`, formDataToSend);
      } else {
        await postDataToAPI('/effectif/contrat/creer_contrat/', formDataToSend);
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

          <TextField
            label="Nature contrat"
            name="nature_contrat"
            value={formData.nature_contrat}
            onChange={handleFormInputChange}
            variant="outlined"
            required
          />

          <TextField
            label="Filière métier"
            name="filiere_metier"
            value={formData.filiere_metier}
            onChange={handleFormInputChange}
            variant="outlined"
            required
          />

          {/* Sélection de l'agent (clé étrangère) */}
          <TextField
            select
            label="Agent"
            name="agent"
            value={formData.agent}
            onChange={handleFormInputChange}
            variant="outlined"
            required
          >
            {agentOptions.length > 0 ? (
              agentOptions.map(agent => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name} {agent.prenom} {/* Affichage de nom et prénom */}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Chargement des agents...</MenuItem>
            )}
          </TextField>

          {/* Date de début */}
          <TextField
            label="Date début"
            name="date_debut"
            type="date"
            value={formData.date_debut}
            onChange={handleFormInputChange}
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
          />

          {/* Date de fin CDD */}
          {formData.type_contrat === "CDD" && (
            <TextField
              label="Date fin CDD"
              name="date_fin_cdd"
              type="date"
              value={formData.date_fin_cdd}
              onChange={handleFormInputChange}
              variant="outlined"
              required={formData.type_contrat === "CDD"} // Champ requis seulement pour CDD
              InputLabelProps={{ shrink: true }}
              style={{ display: formData.type_contrat === "CDD" ? "block" : "none" }} // Caché si ce n'est pas CDD
            />

          )}

          {/* Date de probation */}
          <TextField
            label="Date fin probation"
            name="probation_end_date"
            type="date"
            value={formData.probation_end_date}
            onChange={handleFormInputChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />

          {/* Champ pour attacher un fichier */}
          <Button
            variant="contained"
            color="secondary"
            component="label"
            fullWidth
            sx={{
              textTransform: 'none',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            <AttachFileIcon sx={{ marginRight: '10px' }} /> {/* Icône */}
            Attacher un document
            <input
              type="file"
              name="document"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {/* Affichage du nom du fichier téléchargé */}
          {formData.document && (
            <Box display="flex" alignItems="center" gap="8px" mt="10px">
              <Typography variant="body2" color="textSecondary">
                Fichier sélectionné:
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                {formData.document.name}
              </Typography>
            </Box>
          )}
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
