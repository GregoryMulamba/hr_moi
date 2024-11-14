import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import NotificationIcon from '../Form/NotificationIcon';
import NotificationPopup from '../Form/NotificationPopup';

const AdminView = () => {
  const [notifications, setNotifications] = useState([
    { date: new Date().toISOString(), message: "Une formation atteint sa date de fin aujourd'hui" },
    { date: new Date().toISOString(), message: "Jour d'évaluation pour une formation" }
  ]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" p={2} className="topbar">
        <Typography variant="h4" color="white">
          Admin Dashboard
        </Typography>
        <NotificationIcon notifications={notifications} />
      </Box>
      <NotificationPopup notifications={notifications} setNotifications={setNotifications} />
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Bienvenue, Administrateur
        </Typography>
        {/* Additional admin content can go here */}
      </Box>
    </Box>
  );
};

export default AdminView;
