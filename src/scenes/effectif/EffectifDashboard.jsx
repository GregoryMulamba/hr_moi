import React, { useState } from 'react';
import {
  Grid, FormControl, InputLabel, Select, MenuItem, Typography, Box, Button, Card, CardContent, Modal, IconButton, Snackbar, Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Doughnut, Bar } from 'react-chartjs-2';
import EditIcon from '@mui/icons-material/Edit';
import 'chart.js/auto';
import * as XLSX from 'xlsx';

const EffectifDashboard = () => {
  const [filters, setFilters] = useState({ direction: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleCardClick = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDirections);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Effectif');
    XLSX.writeFile(workbook, 'effectif_dashboard.xlsx');
    setSnackbarMessage('Données exportées avec succès en Excel');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const createDoughnutData = (data) => ({
    labels: data?.labels || [],
    datasets: [
      {
        data: data?.datasets?.[0]?.data || [],
        backgroundColor: data?.datasets?.[0]?.backgroundColor || [],
      },
    ],
  });

  const createBarChartData = (data) => ({
    labels: data?.labels || [],
    datasets: [
      {
        label: 'Agents par tranche d\'âge',
        data: data?.data || [],
        backgroundColor: ['#ffcd56', '#ff9f40', '#ff5733'],
      },
    ],
  });

  const renderWidget = (title, value, color, data) => (
    <Card
      sx={{ minWidth: 275, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
      onClick={() => handleCardClick(data)}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {value}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => handleCardClick(data)} sx={{ color: '#fff' }}>
            <EditIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  // Mock data
  const mockData = {
    totalStaff: 100,
    genderDistribution: 60,
    directions: [
      { name: 'IT', total: 50, notTrained: 20, trained: 30, inPerson: 10, eLearning: 20, title: 'Tech Training' },
      { name: 'HR', total: 30, notTrained: 10, trained: 20, inPerson: 5, eLearning: 15, title: 'HR Workshop' },
    ],
    staffData: [{ name: 'Staff 1', role: 'Manager' }, { name: 'Staff 2', role: 'Non-Manager' }],
    genderData: [{ label: 'Male', data: [60], backgroundColor: ['#2196f3'] }, { label: 'Female', data: [40], backgroundColor: ['#f50057'] }],
    directionsData: [{ label: 'IT', data: [50], backgroundColor: ['#4caf50'] }, { label: 'HR', data: [30], backgroundColor: ['#ff9800'] }],
    agePyramidData: { labels: ['20-30', '30-40', '40-50'], datasets: [{ data: [20, 50, 30], backgroundColor: ['#ffcd56', '#ff9f40', '#ff5733'] }] },
    contractTypesData: { labels: ['Permanent', 'Temporary'], datasets: [{ data: [70, 30], backgroundColor: ['#8e44ad', '#3498db'] }] },
    pyramidAgeData: { labels: ['20-30', '30-40', '40-50'], data: [50, 30, 20] },
  };

  const filteredDirections = filters.direction
    ? mockData.directions.filter((direction) => direction.name === filters.direction).map((direction, index) => ({
        ...direction,
        id: index,
    }))
    : mockData.directions.map((direction, index) => ({
        ...direction,
        id: index,
    }));

  const columns = [
    { field: 'name', headerName: 'Direction', width: 150 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'notTrained', headerName: 'Pas Formés', width: 150 },
    { field: 'trained', headerName: 'Formés', width: 100 },
    { field: 'inPerson', headerName: 'Hors E-Learning', width: 150 },
    { field: 'eLearning', headerName: 'E-Learning', width: 150 },
    { field: 'title', headerName: 'Titre de la formation', width: 200 },
  ];

  // Modal style definition
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: 20,
    boxShadow: 24,
    borderRadius: 4,
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord de l'Effectif
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Direction</InputLabel>
            <Select
              name="direction"
              value={filters.direction}
              onChange={handleChange}
              label="Direction"
            >
              <MenuItem value=""><em>Toutes les directions</em></MenuItem>
              {mockData.directions.map((direction, index) => (
                <MenuItem key={index} value={direction.name}>{direction.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          {renderWidget('Effectif du Staff', mockData.totalStaff, '#4caf50', mockData.staffData)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderWidget('Effectif par Genre', mockData.genderDistribution, '#2196f3', mockData.genderData)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderWidget('Effectif par Direction', mockData.directions.length, '#ff9800', mockData.directionsData)}
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Répartition des Effectifs par Age</Typography>
            <Doughnut data={createDoughnutData(mockData.agePyramidData)} options={{ maintainAspectRatio: true, responsive: true, height: 150 }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Répartition des Contrats</Typography>
            <Doughnut data={createDoughnutData(mockData.contractTypesData)} options={{ maintainAspectRatio: true, responsive: true, height: 150 }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Répartition des Agents par Tranche d'Age</Typography>
            <Bar data={createBarChartData(mockData.pyramidAgeData)} options={{ maintainAspectRatio: true, responsive: true, height: 150 }} />
          </Card>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={downloadExcel}>Exporter en Excel</Button>
      </Box>

      <DataGrid
        rows={filteredDirections}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        sx={{ height: 400, width: '100%', mt: 3 }}
      />

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {modalData?.title}
          </Typography>
          <Typography variant="body1">{`Total Formés: ${modalData?.trained}`}</Typography>
          <Typography variant="body1">{`Non Formés: ${modalData?.notTrained}`}</Typography>
          <Button variant="contained" onClick={handleCloseModal} sx={{ mt: 2 }}>Fermer</Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifDashboard;