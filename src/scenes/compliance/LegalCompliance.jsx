import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const LegalCompliance = () => {
  const [legalItems, setLegalItems] = useState([
    { id: 1, title: "RGPD (EU)", status: "Conforme", description: "Toutes les données sont encryptées." },
    { id: 2, title: "Loi travail RDC", status: "Revue en cours", description: "Contrats ajustés au Code du Travail 2024." },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ id: "", title: "", status: "", description: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOpenDialog = () => {
    setFormData({ id: "", title: "", status: "", description: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    if (formData.id) {
      setLegalItems((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      setSnackbarMessage("Élément mis à jour avec succès !");
    } else {
      setLegalItems((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
      setSnackbarMessage("Nouvel élément ajouté avec succès !");
    }
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setLegalItems((prev) => prev.filter((item) => item.id !== id));
    setSnackbarMessage("Élément supprimé avec succès !");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Conformité Légale
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Ajouter un Élément
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {legalItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(item)}>
                    Éditer
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(item.id)}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{formData.id ? "Éditer l'Élément" : "Ajouter un Élément"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Titre"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Statut"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LegalCompliance;
