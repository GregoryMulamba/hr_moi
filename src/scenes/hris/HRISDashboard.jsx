import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Bar } from "react-chartjs-2";

const HRISDashboard = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Recrutements",
        backgroundColor: "#4caf50",
        data: [10, 15, 20, 25, 30],
      },
      {
        label: "Départs",
        backgroundColor: "#f44336",
        data: [5, 8, 10, 7, 5],
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord RH
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recrutements vs Départs</Typography>
              <Box height={250}>
                <Bar data={chartData} options={{ responsive: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HRISDashboard;
