// src/scenes/training/TrainingProgress.js
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import Header from '../../components/Header';
import { trainingProgressData } from '../../data/mockData';

const TrainingProgress = () => {
  return (
    <Box m="20px">
      <Header title="Progression des Formations" subtitle="Suivi de la progression de chaque agent" />
      <Box mt="20px">
        {trainingProgressData.map((progress) => (
          <Box key={progress.agentId} mb="20px">
            <Typography variant="h6">{progress.agentName}</Typography>
            <Typography variant="subtitle1">{progress.trainingTitle}</Typography>
            <LinearProgress variant="determinate" value={progress.progressPercentage} />
            <Typography variant="body2">{`${progress.progressPercentage}%`}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrainingProgress;
