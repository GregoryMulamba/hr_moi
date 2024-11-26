import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Line } from "react-chartjs-2";

const absenteeismData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Absentéisme",
      backgroundColor: "#f44336",
      borderColor: "#f44336",
      data: [5, 7, 8, 10, 6, 9, 11],
      fill: false,
      tension: 0.1,
    },
  ],
};

const performanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Performance des Employés",
      backgroundColor: "#4caf50",
      borderColor: "#4caf50",
      data: [80, 85, 78, 92, 88, 90, 94],
      fill: false,
      tension: 0.1,
    },
  ],
};

const Analytics = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Analyses RH
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Taux d'Absentéisme</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={absenteeismData} options={{ responsive: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Performance des Employés</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={performanceData} options={{ responsive: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
