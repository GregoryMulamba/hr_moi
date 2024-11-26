import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

const OnboardingForm = ({ handleAddEmployee }) => {
  const [employeeData, setEmployeeData] = useState({
    fullName: "",
    email: "",
    department: "",
    startDate: "",
    position: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleAddEmployee(employeeData);
    setSnackbarMessage("Employé ajouté avec succès !");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setEmployeeData({
      fullName: "",
      email: "",
      department: "",
      startDate: "",
      position: "",
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m={3}>
      <TextField
        label="Nom Complet"
        name="fullName"
        value={employeeData.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={employeeData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Département</InputLabel>
        <Select
          name="department"
          value={employeeData.department}
          onChange={handleChange}
        >
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Développement">Développement</MenuItem>
          <MenuItem value="Ressources Humaines">Ressources Humaines</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Date de début"
        name="startDate"
        type="date"
        value={employeeData.startDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Poste"
        name="position"
        value={employeeData.position}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Ajouter l'Employé
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OnboardingForm;
