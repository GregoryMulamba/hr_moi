// src/scenes/request/RequestForm.js

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { requestTypesData } from '../../data/requestTypes';
import AttachmentIcon from '@mui/icons-material/Attachment';

const RequestForm = ({ openDialog, handleCloseDialog, addRequest }) => {
  const [formData, setFormData] = useState({
    assignTo: '',
    category: '',
    ticket: '',
    requestType: '',
    description: '',
    documentsRequired: [],
    sla: '',
    groupe: '',
    niveaux: {
      niveau1: [],
      niveau2: [],
      niveau3: [],
    },
    status: 'Soumis',
    uploadedFiles: [], // Nouveau champ pour gérer les fichiers uploadés
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'requestType') {
      const selectedRequest = requestTypesData.find((item) => item.type === value);
      if (selectedRequest) {
        setFormData({
          ...formData,
          requestType: value,
          sla: selectedRequest.sla,
          groupe: selectedRequest.groupe,
          niveaux: selectedRequest.niveaux,
          documentsRequired: selectedRequest.documentsRequired,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, uploadedFiles: [...formData.uploadedFiles, ...files] });
  };

  const handleSave = () => {
    addRequest(formData);
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Ajouter une Demande</DialogTitle>
      <DialogContent>
        <TextField
          label="Assign to"
          name="assignTo"
          value={formData.assignTo}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Catégorie"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Ticket"
          name="ticket"
          value={formData.ticket}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Type de Demande</InputLabel>
          <Select
            name="requestType"
            value={formData.requestType}
            onChange={handleInputChange}
          >
            {requestTypesData.map((item) => (
              <MenuItem key={item.type} value={item.type}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <Box mt={2}>
          <Alert severity="info">
            <strong>SLA:</strong> {formData.sla}
            <br />
            <strong>Groupe:</strong> {formData.groupe}
            <br />
            <strong>Membres Niveau 1:</strong> {formData.niveaux.niveau1.join(', ')}
            <br />
            <strong>Membres Niveau 2:</strong> {formData.niveaux.niveau2.join(', ')}
            <br />
            <strong>Membres Niveau 3:</strong> {formData.niveaux.niveau3.join(', ')}
          </Alert>
        </Box>
        {/* Champ d'upload pour les fichiers */}
        <Box mt={2}>
          <Button variant="contained" component="label">
            Upload Files
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileUpload}
            />
          </Button>
          {formData.uploadedFiles.length > 0 && (
            <List>
              {formData.uploadedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <AttachmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSave} color="primary">
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestForm;
