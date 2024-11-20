import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const mockData = {
  stats: {
    totalRequests: 50,
    approved: 30,
    pending: 15,
    rejected: 5,
  },
  requestStatusData: {
    labels: ["Approuvées", "En attente", "Rejetées"],
    datasets: [
      {
        data: [30, 15, 5],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  },
};

const RequestDashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord des Demandes
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#4caf50", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Demandes</Typography>
              <Typography variant="h3">{mockData.stats.totalRequests}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Statut des Demandes</Typography>
              <Box height={200}>
                <Doughnut data={mockData.requestStatusData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestDashboard;
