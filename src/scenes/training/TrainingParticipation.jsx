import React, { useState } from 'react';
import {
  Box, Button, Snackbar, Alert, Select, MenuItem, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Header from '../../components/Header';
import { trainingParticipation as initialTrainingParticipation, directions } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const TrainingParticipation = () => {
  const [trainingParticipation, setTrainingParticipation] = useState(initialTrainingParticipation);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    id: '',
    participant: '',
    direction: '',
    type: '',
    gender: '',
    assigned: ''
  });

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(trainingParticipation);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TrainingParticipation');
    XLSX.writeFile(wb, 'TrainingParticipation.xlsx');
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          console.log('Imported data:', json);

          setTrainingParticipation(json);
          setSnackbarMessage('Data imported successfully');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        } catch (error) {
          console.error('Error importing data:', error);
          setSnackbarMessage('Error importing data');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleAdd = () => {
    setDialogData({ id: Date.now(), participant: '', direction: '', type: '', gender: '', assigned: 'auto' });
    setOpenDialog(true);
  };

  const handleEdit = (row) => {
    setDialogData(row);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setTrainingParticipation((prev) => prev.filter((row) => row.id !== id));
    setSnackbarMessage('Entry deleted successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleSave = () => {
    setTrainingParticipation((prev) => {
      const index = prev.findIndex((row) => row.id === dialogData.id);
      if (index !== -1) {
        const newData = [...prev];
        newData[index] = dialogData;
        return newData;
      }
      return [...prev, dialogData];
    });
    setOpenDialog(false);
    setSnackbarMessage('Entry saved successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    { field: 'participant', headerName: 'Participant', width: 200 },
    { field: 'direction', headerName: 'Direction', width: 200 },
    { field: 'type', headerName: 'Type de Formation', width: 200 },
    { field: 'gender', headerName: 'Genre', width: 150 },
    { field: 'assigned', headerName: 'Assignation', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Training Participation" subtitle="Liste des participants par formation" />
      <Box m="10px 0">
        <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginLeft: '5px' }}>
          Ajouter
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportExcel} style={{ marginLeft: '5px' }}>
          Exporter vers Excel
        </Button>
        <input
          accept=".xlsx, .xls"
          style={{ display: 'none' }}
          id="import-excel"
          type="file"
          onChange={handleImportExcel}
        />
        <label htmlFor="import-excel">
          <Button variant="contained" component="span" style={{ marginLeft: '5px' }}>
            Importer depuis Excel
          </Button>
        </label>
      </Box>
      <Box height="70vh" sx={{ display: 'flex', flexDirection: 'column', height: '400%', width: '85%' }}>
        <DataGrid
          rows={trainingParticipation}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
          disableSelectionOnClick
        />
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogData.id ? 'Edit Entry' : 'Add Entry'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the training participation entry.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Participant"
            type="text"
            fullWidth
            value={dialogData.participant}
            onChange={(e) => setDialogData({ ...dialogData, participant: e.target.value })}
          />
          <Select
            margin="dense"
            label="Direction"
            fullWidth
            value={dialogData.direction}
            onChange={(e) => setDialogData({ ...dialogData, direction: e.target.value })}
          >
            {directions.map((direction) => (
              <MenuItem key={direction.value} value={direction.value}>
                {direction.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Type de Formation"
            type="text"
            fullWidth
            value={dialogData.type}
            onChange={(e) => setDialogData({ ...dialogData, type: e.target.value })}
          />
        
          <Select
            fullWidth
            value={dialogData.assigned}
            onChange={(e) => setDialogData({ ...dialogData, assigned: e.target.value })}
          >
            <MenuItem value="auto">Auto-assignation</MenuItem>
            <MenuItem value="assigned">Assignée</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrainingParticipation;
