import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icône pour les demandes approuvées
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Icône pour les demandes en attente
import CancelIcon from "@mui/icons-material/Cancel"; // Icône pour les demandes rejetées

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
  monthlyData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Demandes Approuvées",
        backgroundColor: "#4caf50",
        data: [5, 6, 7, 8, 5, 7, 10, 8, 9, 6, 7, 8],
      },
      {
        label: "Demandes En attente",
        backgroundColor: "#ff9800",
        data: [2, 3, 4, 5, 3, 4, 6, 4, 3, 5, 6, 4],
      },
      {
        label: "Demandes Rejetées",
        backgroundColor: "#f44336",
        data: [1, 2, 1, 3, 2, 2, 2, 1, 2, 2, 3, 2],
      },
    ],
  },
};

const RequestDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSnackbarMessage(`Filtre appliqué : ${event.target.value}`);
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const filteredData = () => {
    switch (filter) {
      case "approved":
        return [mockData.stats.approved, 0, 0];
      case "pending":
        return [0, mockData.stats.pending, 0];
      case "rejected":
        return [0, 0, mockData.stats.rejected];
      default:
        return mockData.requestStatusData.datasets[0].data;
    }
  };

  const updatedChartData = {
    labels: mockData.requestStatusData.labels,
    datasets: [
      {
        ...mockData.requestStatusData.datasets[0],
        data: filteredData(),
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord des Demandes
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Filtrer par Statut</InputLabel>
            <Select value={filter} onChange={handleFilterChange} label="Filtrer par Statut">
              <MenuItem value="all">Tous les Statuts</MenuItem>
              <MenuItem value="approved">Approuvées</MenuItem>
              <MenuItem value="pending">En attente</MenuItem>
              <MenuItem value="rejected">Rejetées</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Total Requests Widget */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#4caf50", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Demandes</Typography>
              <Typography variant="h3">{mockData.stats.totalRequests}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Approved Requests Widget */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#2196f3", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CheckCircleIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Box>
                  <Typography variant="h6">Demandes Approuvées</Typography>
                  <Typography variant="h3">{mockData.stats.approved}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Requests Widget */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#ff9800", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <HourglassEmptyIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Box>
                  <Typography variant="h6">Demandes En Attente</Typography>
                  <Typography variant="h3">{mockData.stats.pending}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rejected Requests Widget */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#f44336", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CancelIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Box>
                  <Typography variant="h6">Demandes Rejetées</Typography>
                  <Typography variant="h3">{mockData.stats.rejected}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Statut des Demandes</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, width: 200 }}>
                <Doughnut data={updatedChartData} options={{ maintainAspectRatio: false, responsive: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Requests Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Demandes Mensuelles</Typography>
              <Box height={250}>
                <Bar data={mockData.monthlyData} options={{ maintainAspectRatio: true, responsive: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RequestDashboard;
