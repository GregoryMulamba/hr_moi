import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { green, red, orange } from "@mui/material/colors";

const mockPerformanceData = {
  totalEmployees: 100,
  excellent: 30,
  veryGood: 25,
  good: 20,
  fair: 15,
  poor: 10,
};

const PerformanceDashboard = () => {
  const [performanceStats, setPerformanceStats] = useState(mockPerformanceData);

  const performanceDistribution = {
    labels: ["Excellent", "Très bon", "Bon", "Passable", "Insuffisant"],
    datasets: [
      {
        data: [
          performanceStats.excellent,
          performanceStats.veryGood,
          performanceStats.good,
          performanceStats.fair,
          performanceStats.poor,
        ],
        backgroundColor: [
          green[500],
          orange[500],
          "#4caf50",
          orange[600],
          red[500],
        ],
      },
    ],
  };

  const performanceByMonth = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Excellent",
        backgroundColor: green[500],
        data: Array(12).fill(5), // Example static data
      },
      {
        label: "Très bon",
        backgroundColor: orange[500],
        data: Array(12).fill(4), // Example static data
      },
      {
        label: "Bon",
        backgroundColor: "#4caf50",
        data: Array(12).fill(3), // Example static data
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord des Performances
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Performance Totale</Typography>
              <Typography variant="h3">{performanceStats.totalEmployees}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Excellent</Typography>
              <Typography variant="h3">{performanceStats.excellent}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Très bon</Typography>
              <Typography variant="h3">{performanceStats.veryGood}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Distribution des Performances</Typography>
              <Doughnut data={performanceDistribution} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Performances Mensuelles</Typography>
              <Bar data={performanceByMonth} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerformanceDashboard;
