import React, { useState } from 'react';
import {
  Grid, FormControl, InputLabel, Select, MenuItem, Typography, Box, Button, Card, CardContent, Modal, Snackbar, Alert, IconButton,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';  // Import du graphique en barres
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import { mockData } from '../../data/mockData';

const TrainingDashboard = () => {
  const [filters, setFilters] = useState({ direction: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleCardClick = (type) => {
    let data = null;
    switch (type) {
      case 'totalAgents':
        data = mockData.directions.map((dir) => ({
          direction: dir.name,
          formés: dir.trained,
          pasFormés: dir.notTrained,
        }));
        break;
      case 'inPerson':
        data = mockData.directions.map((dir) => ({
          direction: dir.name,
          formésHorsE: dir.inPerson,
        }));
        break;
      case 'eLearning':
        data = mockData.directions.map((dir) => ({
          direction: dir.name,
          formésE: dir.eLearning,
        }));
        break;
      case 'participationGlobal':
        data = {
          genres: mockData.participationDetailsByGender,
          chartData: {
            labels: mockData.participationDetailsByGender.map(item => item.genre),
            datasets: [
              {
                label: 'Participation par Genre',
                data: mockData.participationDetailsByGender.map(item => item.nombre),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                borderColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                borderWidth: 1,
              }
            ]
          }
        };
        break;
      default:
        break;
    }
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(modalData.genres);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Export');
    XLSX.writeFile(workbook, `${modalType}_details.xlsx`);
    setSnackbarMessage('Données exportées avec succès en Excel');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const renderWidget = (title, value, color, type) => (
    <Card
      sx={{ minWidth: 275, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
      onClick={() => handleCardClick(type)}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {value}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton sx={{ color: '#fff' }}>
            <EditIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord de la formation
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
          {renderWidget('TOTAL AGENTS', mockData.totalAgents, '#4caf50', 'totalAgents')}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderWidget('FORMATION HORS E-LEARNING', mockData.trainingParticipation.inPerson, '#2196f3', 'inPerson')}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderWidget('FORMATION E-LEARNING', mockData.trainingParticipation.eLearning, '#ff9800', 'eLearning')}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderWidget('PARTICIPATION GLOBALE', mockData.trainingParticipation.total, '#f44336', 'participationGlobal')}
        </Grid>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500,
          bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Détails {modalType === 'participationGlobal' ? 'Participation par Genre' : ''}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {modalType === 'participationGlobal' && (
              <>
                <Bar data={modalData.chartData} options={{
                  responsive: true,
                  scales: {
                    x: { 
                      beginAtZero: true,
                    },
                  },
                }} />
                <ul>
                  {modalData.genres.map((item, index) => (
                    <li key={index}>{item.genre} : {item.nombre}</li>
                  ))}
                </ul>
              </>
            )}
            {(modalType === 'totalAgents' || modalType === 'inPerson' || modalType === 'eLearning') && (
              <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={modalData.map((data, index) => ({ id: index + 1, ...data }))}
                  columns={[
                    { field: 'direction', headerName: 'Direction', width: 200 },
                    { field: Object.keys(modalData[0])[1], headerName: 'Effectif', width: 150 },
                  ]}
                  pageSize={5}
                />
              </div>
            )}
          </Box>
          <Button onClick={downloadExcel} variant="contained" color="primary" sx={{ mt: 3 }}>
            Exporter en Excel
          </Button>
        </Box>
      </Modal>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrainingDashboard;
