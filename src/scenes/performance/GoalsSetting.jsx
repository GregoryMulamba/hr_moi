import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const GoalsSetting = () => {
  const [goalData, setGoalData] = useState({
    employee: "",
    goal: "",
    target: "",
    status: "In progress",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Here we can save the goal data, maybe to a backend or state
    console.log("Goal Submitted:", goalData);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Définition des Objectifs
      </Typography>

      <TextField
        label="Nom de l'employé"
        name="employee"
        fullWidth
        margin="normal"
        value={goalData.employee}
        onChange={handleInputChange}
      />
      <TextField
        label="Objectif"
        name="goal"
        fullWidth
        margin="normal"
        value={goalData.goal}
        onChange={handleInputChange}
      />
      <TextField
        label="Cible"
        name="target"
        fullWidth
        margin="normal"
        value={goalData.target}
        onChange={handleInputChange}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Statut</InputLabel>
        <Select
          name="status"
          value={goalData.status}
          onChange={handleInputChange}
        >
          <MenuItem value="In progress">En cours</MenuItem>
          <MenuItem value="Completed">Complété</MenuItem>
          <MenuItem value="Not Started">Non commencé</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Soumettre l'objectif
      </Button>
    </Box>
  );
};

export default GoalsSetting;
