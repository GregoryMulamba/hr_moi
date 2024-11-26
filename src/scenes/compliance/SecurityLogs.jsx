import React, { useState, useEffect } from 'react';
import { Box, Typography, DataGrid } from '@mui/material';
import { fetchDataFromAPI } from '../../api'; // API fetch logic

const SecurityLogs = () => {
  const [securityLogs, setSecurityLogs] = useState([]);

  useEffect(() => {
    fetchSecurityLogs();
  }, []);

  const fetchSecurityLogs = async () => {
    try {
      const response = await fetchDataFromAPI('/compliance/security-logs');
      setSecurityLogs(response.data);
    } catch (error) {
      console.error('Error fetching security logs:', error);
    }
  };

  const columns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'event', headerName: 'Event', width: 250 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'ip', headerName: 'IP Address', width: 200 },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Security Logs</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={securityLogs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </Box>
  );
};

export default SecurityLogs;
