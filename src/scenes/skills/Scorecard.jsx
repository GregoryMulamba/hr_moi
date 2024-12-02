// Scorecard.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Scorecard = () => {
  const employeeScores = [
    { name: 'John Doe', skill1: 'Advanced', skill2: 'Intermediate', skill3: 'Beginner' },
    { name: 'Jane Smith', skill1: 'Intermediate', skill2: 'Advanced', skill3: 'Advanced' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Scorecard des Employés</Typography>
      <List>
        {employeeScores.map((score, index) => (
          <ListItem key={index}>
            <ListItemText primary={score.name} />
            <Typography variant="body2">Compétence 1: {score.skill1}</Typography>
            <Typography variant="body2">Compétence 2: {score.skill2}</Typography>
            <Typography variant="body2">Compétence 3: {score.skill3}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Scorecard;
