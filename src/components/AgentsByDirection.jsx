import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import api from '../../api';

const EmployeeDistribution = () => {
  const [distributions, setDistributions] = useState([]);

  useEffect(() => {
    const fetchEmployeeDistributions = async () => {
      try {
        const response = await api.get('/employees');
        const employees = response.data;

        const directionCounts = employees.reduce((acc, employee) => {
          const directionName = employee.direction;
          if (!acc[directionName]) {
            acc[directionName] = 0;
          }
          acc[directionName]++;
          return acc;
        }, {});

        setDistributions(Object.entries(directionCounts));
      } catch (error) {
        console.error("Erreur lors de la récupération des données des employés", error);
      }
    };

    fetchEmployeeDistributions();
  }, []);

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">Répartition des agents par direction</Typography>
      {distributions.map(([direction, count]) => (
        <Card key={direction} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{direction}</Typography>
            <Typography variant="h2">{count}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default EmployeeDistribution;
