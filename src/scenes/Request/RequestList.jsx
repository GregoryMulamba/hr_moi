import React, { useState } from 'react';
import { Box, Button, Alert, AlertTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import RequestForm from './RequestForm';

const initialRequests = [
  {
    id: 1,
    assignTo: 'John Doe',
    category: 'Ressources Humaines',
    ticket: 'REQ-001',
    requestType: 'Demande de document',
    description: 'Demande d’attestation de travail',
    documentsRequired: ['Attestation de travail', 'Justificatif d’identité'],
    sla: '3 jours',
    status: 'Soumis',
  },
  {
    id: 2,
    assignTo: 'Jane Smith',
    category: 'IT Support',
    ticket: 'REQ-002',
    requestType: 'Assistance technique',
    description: 'Demande de support pour le logiciel CRM',
    documentsRequired: ['Formulaire de demande', 'Manuel utilisateur'],
    sla: '5 jours',
    status: 'Hand on',
  },
  {
    id: 3,
    assignTo: 'Peter Johnson',
    category: 'Finance',
    ticket: 'REQ-003',
    requestType: 'Remboursement',
    description: 'Demande de remboursement des frais de déplacement',
    documentsRequired: ['Reçus de frais', 'Formulaire de remboursement'],
    sla: '10 jours',
    status: 'Terminé',
  },
];

const RequestList = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [alert, setAlert] = useState(null); // Utilisation pour afficher des alertes
  const [openDialog, setOpenDialog] = useState(false);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(requests);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Requests');
    XLSX.writeFile(wb, 'Requests.xlsx');
    setAlert({
      severity: 'warning',
      title: 'Warning',
      message: 'Données exportées avec succès en Excel',
    });
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
          setRequests(json);
          setAlert({
            severity: 'warning',
            title: 'Warning',
            message: 'Données importées avec succès',
          });
        } catch (error) {
          setAlert({
            severity: 'error',
            title: 'Erreur',
            message: 'Erreur lors de l\'importation des données',
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleTakeRequest = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: 'Hand on' } : request
    );
    setRequests(updatedRequests);
    setAlert({
      severity: 'warning',
      title: 'Warning',
      message: 'Demande prise en charge',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      const updatedRequests = requests.filter((request) => request.id !== id);
      setRequests(updatedRequests);
      setAlert({
        severity: 'warning',
        title: 'Warning',
        message: 'Demande supprimée avec succès',
      });
    }
  };

  const columns = [
    {
      field: 'assignTo',
      headerName: 'Assign to',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleTakeRequest(params.row.id)}
        >
          Take
        </Button>
      ),
    },
    { field: 'category', headerName: 'Catégorie', width: 180 },
    { field: 'ticket', headerName: 'Ticket', width: 120 },
    { field: 'requestType', headerName: 'Type de Demande', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'documentsRequired',
      headerName: 'Documents Requis',
      width: 250,
      valueGetter: (params) => params.row.documentsRequired.join(', '),
    },
    { field: 'sla', headerName: 'SLA (Délai)', width: 150 },
    { field: 'status', headerName: 'Statut', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(params.row)}>
            Modifier
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (request) => {
    // Logique pour modifier une demande
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box m="20px">
      {/* Affichage des alertes */}
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      )}

      <Box mb="10px">
        <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginRight: '10px' }}>
          Ajouter une Demande
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportExcel} style={{ marginRight: '10px' }}>
          Exporter en Excel
        </Button>
        <input
          accept=".xlsx, .xls"
          style={{ display: 'none' }}
          id="import-excel"
          type="file"
          onChange={handleImportExcel}
        />
        <label htmlFor="import-excel">
          <Button variant="contained" component="span">
            Importer depuis Excel
          </Button>
        </label>
      </Box>
      <Box
        height="70vh"
        sx={{
          overflowX: 'auto',
          overflowY: 'auto',
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
        }}
      >
        <DataGrid
          rows={requests}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
          disableSelectionOnClick
        />
      </Box>

      {/* Intégration du formulaire de demande ici */}
      <RequestForm openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
    </Box>
  );
};

export default RequestList;
