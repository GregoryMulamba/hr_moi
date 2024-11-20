// src/scenes/request/RequestList.js

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Alert, AlertTitle } from '@mui/material';

const RequestList = ({ requests, setRequests }) => {
  const handleTakeRequest = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: 'Hand on' } : request
    );
    setRequests(updatedRequests);
  };

  const columns = [
    { field: 'assignTo', headerName: 'Assign to', width: 150 },
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
    { field: 'sla', headerName: 'SLA (Délai)', width: 150 },
    { field: 'status', headerName: 'Statut', width: 150 },
  ];

  return (
    <Box mt={3} style={{ height: 400, width: '100%' }}>
      <DataGrid rows={requests} columns={columns} pageSize={10} />
    </Box>
  );
};

export default RequestList;
