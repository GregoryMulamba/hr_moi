import React, { useState } from "react";
import { Modal, TextField, Box, Typography, Button } from "@mui/material";
import {updateDataToAPI } from "../../../api";
const ValiderRequestModal = ({ open, onClose, selectedRequest, requests, setRequests, setAlert }) => {
  const [commentaire, setCommentaire] = useState('');
  const [fichier, setFichier] = useState(null);

  const handleCommentaireChange = (event) => {
    setCommentaire(event.target.value);
  };

  const handleFileChange = (event) => {
    setFichier(event.target.files[0]);
  };

  const handleValiderRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("commentaire", commentaire);
      if (fichier) formData.append("fichier_joint", fichier);

      const response = await updateDataToAPI(
        `/demande/Demande/${selectedRequest.id}/valider_demande/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedRequests = requests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: "Fermé" } : request
      );
      setRequests(updatedRequests);
      setAlert({
        severity: "info",
        title: "Info",
        message: "Demande validée avec succès et l'agent a été notifié.e",
      });

      onClose(); // Fermer le modal après validation
    } catch (error) {
      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Erreur lors de la validation de la demande : ${error.message}`,
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 2,
        boxShadow: 24
      }}>
        <Typography variant="h6" gutterBottom>Valider la Demande</Typography>

        <TextField
          label="Commentaire"
          variant="outlined"
          fullWidth
          value={commentaire}
          onChange={handleCommentaireChange}
          sx={{ marginBottom: 2 }}
          multiline
          rows={4}
        />

        <input
          type="file"
          accept="application/pdf, image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleValiderRequest}
          sx={{ marginRight: 2 }}
        >
          Confirmer
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
        >
          Annuler
        </Button>
      </Box>
    </Modal>
  );
};

export default ValiderRequestModal;
