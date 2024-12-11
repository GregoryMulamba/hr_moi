// src/scenes/Dashboard/AgePyramid.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import api from '../../api';

const AgePyramid = () => {
  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    const fetchAgePyramid = async () => {
      try {
        const response = await api.get('/employees/');
        const employees = response.data;

        const currentYear = new Date().getFullYear();
        const ageCounts = employees.reduce((acc, employee) => {
          const birthYear = new Date(employee.birth_date).getFullYear();
          const age = currentYear - birthYear;
          const ageGroup = `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`;
          if (!acc[ageGroup]) {
            acc[ageGroup] = 0;
          }
          acc[ageGroup]++;
          return acc;
        }, {});

        setAgeGroups(Object.entries(ageCounts));
      } catch (error) {
        console.error("Erreur lors de la récupération des données des employés", error);
      }
    };

    fetchAgePyramid();
  }, []);

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">Pyramide des âges</Typography>
      {ageGroups.map(([ageGroup, count]) => (
        <Card key={ageGroup} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{ageGroup}</Typography>
            <Typography variant="h2">{count}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AgePyramid;
