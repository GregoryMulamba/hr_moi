import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const departmentData = {
  labels: ["Développement", "Marketing", "RH", "Finance", "Support"],
  datasets: [
    {
      data: [40, 30, 10, 15, 5],
      backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"],
    },
  ],
};

const genderData = {
  labels: ["Hommes", "Femmes"],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ["#2196f3", "#e91e63"],
    },
  ],
};

const KPIs = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Indicateurs Clés RH (KPIs)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition des Employés par Département</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <Doughnut data={departmentData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition des Employés par Sexe</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <Doughnut data={genderData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KPIs;
