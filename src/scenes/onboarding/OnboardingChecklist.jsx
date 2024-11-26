import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Checkbox, FormControlLabel } from "@mui/material";

const OnboardingChecklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Remplir les documents administratifs", completed: false },
    { id: 2, task: "Créer un compte sur le portail RH", completed: false },
    { id: 3, task: "Suivre la formation sur la politique de sécurité", completed: false },
    { id: 4, task: "Configurer l'ordinateur et les outils nécessaires", completed: false },
  ]);

  const handleTaskChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Liste de Contrôle Onboarding
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleTaskChange(task.id)}
                  name="task"
                />
              }
              label={task.task}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OnboardingChecklist;
