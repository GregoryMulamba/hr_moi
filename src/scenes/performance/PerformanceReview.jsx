import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const PerformanceReview = () => {
  const [performanceData, setPerformanceData] = useState({
    employee: "",
    rating: "",
    comments: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerformanceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Ici, on peut envoyer les données au backend ou les traiter
    setSnackbarMessage("Évaluation enregistrée avec succès !");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Évaluation de la Performance
      </Typography>

      <TextField
        label="Nom de l'employé"
        name="employee"
        fullWidth
        margin="normal"
        value={performanceData.employee}
        onChange={handleInputChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Note</InputLabel>
        <Select
          name="rating"
          value={performanceData.rating}
          onChange={handleInputChange}
        >
          <MenuItem value="Excellent">Excellent</MenuItem>
          <MenuItem value="Très bon">Très bon</MenuItem>
          <MenuItem value="Bon">Bon</MenuItem>
          <MenuItem value="Passable">Passable</MenuItem>
          <MenuItem value="Insuffisant">Insuffisant</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Commentaires"
        name="comments"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={performanceData.comments}
        onChange={handleInputChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Soumettre l'évaluation
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PerformanceReview;
