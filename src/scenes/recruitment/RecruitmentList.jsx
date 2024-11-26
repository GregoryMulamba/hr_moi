import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchDataFromAPI } from '../../api'; // Fetch API logic
import RecruitmentForm from './RecruitmentForm';

const RecruitmentList = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  const fetchRecruitmentData = async () => {
    try {
      const response = await fetchDataFromAPI('/recruitments');
      setRecruitments(response.data);
    } catch (error) {
      setSnackbarMessage('Error fetching recruitment data');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Job Title', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <Button variant="outlined" onClick={() => console.log('Edit recruitment')}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => console.log('Delete recruitment')}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>Add Recruitment</Button>
      <DataGrid rows={recruitments} columns={columns} pageSize={5} />
      <RecruitmentForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RecruitmentList;
