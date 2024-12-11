import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Box, Button, Card, CardContent, Modal, IconButton, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import GroupIcon from '@mui/icons-material/Group';
import * as XLSX from 'xlsx';

const directions = [
  { value: "DG", label: "Direction Générale" },
  { value: "DAF", label: "Direction Financière" },
  { value: "DST", label: "Direction Stratégie et Transformation" },
  { value: "DRH", label: "Direction des Ressources Humaines" },
  { value: "DEC", label: "Direction Expérience Client" },
  { value: "DAL", label: "Direction Achats et Logistique" },
  { value: "DRE", label: "Direction Reseaux" },
  { value: "DJAR", label: "Direction Juridique & Affaires Réglementaires" },
  { value: "B2C", label: "Direction Marketing & Communication B2C" },
  { value: "DVD", label: "Direction de Ventes & Distribution" },
  { value: "B2B", label: "Direction Commercial et Marketing B2B" },
  { value: "OM", label: "Orange Money" },
];

const employeurs = [
  { value: "Orange", label: "ORANGE" },
  { value: "OM", label: "ORANGE MONEY" },
  { value: "Itm", label: "ITM" },
  { value: "Bnw", label: "BENSIZWE" },
];

// Mock data
const mockData = {
  Bensizwe: [
    { id: 1, name: 'John Doe', gender: 'male', direction: 'Direction 1', contract: 'CDI' },
    { id: 2, name: 'Jane Smith', gender: 'female', direction: 'Direction 2', contract: 'CDD' },
  ],
  Itm: [
    { id: 1, name: 'Alice Brown', gender: 'female', direction: 'Direction 1', contract: 'CDI' },
    { id: 2, name: 'Bob Johnson', gender: 'male', direction: 'Direction 3', contract: 'CDD' },
  ],
  Orange: [
    { id: 1, name: 'Charlie Green', gender: 'male', direction: 'Direction 2', contract: 'CDI' },
    { id: 2, name: 'Diana White', gender: 'female', direction: 'Direction 4', contract: 'CDD' },
  ],
  OrangeMoney: [
    { id: 1, name: 'Eve Black', gender: 'female', direction: 'Direction 1', contract: 'CDI' },
    { id: 2, name: 'Frank Blue', gender: 'male', direction: 'Direction 5', contract: 'CDD' },
  ]
};

const EffectifDashboard = () => {
  const [filters, setFilters] = useState({ direction: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCardClick = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(modalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Effectif');
    XLSX.writeFile(workbook, `${modalTitle}_details.xlsx`);
    setSnackbarMessage('Données exportées avec succès en Excel');
    setOpenSnackbar(true);
  };

  const renderWidget = (title, value, color, data, IconComponent) => (
    <Card
      sx={{ minWidth: 275, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
      onClick={() => handleCardClick(title, data)}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" sx={{ color: '#fff' }}>{title}</Typography>
            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold' }}>{value}</Typography>
          </Box>
          <IconComponent sx={{ fontSize: 50, color: '#fff' }} />
        </Box>
      </CardContent>
    </Card>
  );

  const filterByDirection = (data, direction) => {
    if (!direction) return data;
    return data.filter(item => item.direction === direction);
  };

  const filteredData = (employeur) => {
    return filterByDirection(mockData[employeur], filters.direction);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord de l'Effectif
      </Typography>

      {/* Filtres */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Direction</InputLabel>
            <Select
              value={filters.direction}
              onChange={(e) => setFilters({ ...filters, direction: e.target.value })}
              label="Direction"
            >
              <MenuItem value=""><em>Toutes les directions</em></MenuItem>
              {directions.map((dir, index) => (
                <MenuItem key={index} value={dir.value}>{dir.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Widgets */}
      <Grid container spacing={2}>
        {employeurs.map((employeur) => (
          <Grid item xs={12} md={4} key={employeur.value}>
            {renderWidget(
              `${employeur.label} Effectif`,
              filteredData(employeur.value).length,
              '#4caf50',
              filteredData(employeur.value),
              GroupIcon
            )}
          </Grid>
        ))}

        {/* Genre */}
        <Grid item xs={12} md={4}>
          {renderWidget(
            `Effectif par Genre`, 
            `${mockData.Orange.filter(emp => emp.gender === 'male').length} / ${mockData.Orange.filter(emp => emp.gender === 'female').length}`, 
            '#ff9800', 
            mockData.Orange, 
            GroupIcon
          )}
        </Grid>

        {/* Taux d'attrition */}
        <Grid item xs={12} md={4}>
          {renderWidget(
            `Taux d'attrition`, 
            '5%', 
            '#2196f3', 
            [], 
            GroupIcon
          )}
        </Grid>

        {/* Contrat */}
        <Grid item xs={12} md={4}>
          {renderWidget(
            `Types de contrat`, 
            `CDI / CDD`, 
            '#9c27b0', 
            mockData.Orange, 
            GroupIcon
          )}
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, borderRadius: 1
        }}>
          <Typography variant="h6">{modalTitle}</Typography>
          <DataGrid
            rows={modalData}
            columns={[
              { field: 'name', headerName: 'Nom', width: 150 },
              { field: 'gender', headerName: 'Genre', width: 120 },
              { field: 'direction', headerName: 'Direction', width: 150 },
              { field: 'contract', headerName: 'Contrat', width: 150 }
            ]}
            pageSize={5}
          />
          <Button onClick={downloadExcel} sx={{ mt: 2 }} variant="contained">Exporter en Excel</Button>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifDashboard;
