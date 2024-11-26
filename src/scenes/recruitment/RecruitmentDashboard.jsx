import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

const RecruitmentDashboard = () => {
  const recruitmentStats = {
    totalJobs: 12,
    totalCandidates: 85,
    hired: 10,
    pending: 25,
    rejected: 50,
  };

  const chartData = {
    labels: ["Embauchés", "En attente", "Rejetés"],
    datasets: [
      {
        data: [recruitmentStats.hired, recruitmentStats.pending, recruitmentStats.rejected],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Candidats",
        backgroundColor: "#2196f3",
        data: [5, 10, 12, 15, 8, 20, 18, 22, 25, 30, 28, 35],
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord Recrutement
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <WorkIcon fontSize="large" color="primary" />
                <Box ml={2}>
                  <Typography variant="h6">Offres Actives</Typography>
                  <Typography variant="h3">{recruitmentStats.totalJobs}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PersonIcon fontSize="large" color="secondary" />
                <Box ml={2}>
                  <Typography variant="h6">Total Candidats</Typography>
                  <Typography variant="h3">{recruitmentStats.totalCandidates}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition des Candidats</Typography>
              <Box sx={{ height: 250, width: "100%", display: "flex", justifyContent: "center" }}>
                <Doughnut data={chartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Candidats par Mois</Typography>
              <Box sx={{ height: 250, width: "100%" }}>
                <Bar data={monthlyData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecruitmentDashboard;
