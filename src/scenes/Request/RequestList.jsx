import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Alert, AlertTitle, Chip } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

const RequestList = ({ requests, setRequests }) => {
  const handleTakeRequest = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: 'En cours' } : request
    );
    setRequests(updatedRequests);
  };

  const columns = [
    { field: 'assignTo', headerName: 'Assigné à', width: 150 },
    { field: 'groupe', headerName: 'Groupe', width: 180 },
    { field: 'ticket', headerName: 'Ticket', width: 120 },
    { field: 'requestType', headerName: 'Type de Demande', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'documentsRequired',
      headerName: 'Documents Requis',
      width: 250,
      valueGetter: (params) => params.row.documentsRequired.join(', '),
    },
    {
      field: 'uploadedFiles',
      headerName: 'Fichiers Uploadés',
      width: 250,
      valueGetter: (params) =>
        params.row.uploadedFiles
          ? params.row.uploadedFiles.map((file) => file.name).join(', ')
          : '',
    },
    { field: 'sla', headerName: 'SLA', width: 150 },
    {
      field: 'status',
      headerName: 'Statut',
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let color = red[500];
        if (status === 'Approuvé') color = green[500];
        if (status === 'En attente') color = orange[500];
        return <Chip label={status} style={{ backgroundColor: color, color: 'white' }} />;
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleTakeRequest(params.row.id)}
        >
          Prendre en charge
        </Button>
      ),
    },
  ];

  return (
    <Box mt={3} style={{ height: 400, width: '100%' }}>
      <DataGrid rows={requests} columns={columns} pageSize={10} />
    </Box>
  );
};

export default RequestList;
