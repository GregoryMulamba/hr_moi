import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const RecruitmentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    openings: 1,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
    console.log("New Job Posted:", formData);
    setOpenSnackbar(true);
    setFormData({ title: "", description: "", department: "", openings: 1 });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Publier une Offre d'Emploi
      </Typography>
      <Box mt={2}>
        <TextField
          label="Titre du poste"
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="dense"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          margin="dense"
        />
        <TextField
          label="Département"
          fullWidth
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          margin="dense"
        />
        <TextField
          label="Nombre de postes ouverts"
          type="number"
          fullWidth
          value={formData.openings}
          onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Publier
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Offre publiée avec succès !</Alert>
      </Snackbar>
    </Box>
  );
};

export default RecruitmentForm;
