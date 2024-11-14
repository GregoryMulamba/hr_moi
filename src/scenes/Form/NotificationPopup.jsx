import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationPopup = ({ notifications, setNotifications }) => {
  useEffect(() => {
    const now = new Date();
    const dueNotifications = notifications.filter(notification => {
      const notificationDate = new Date(notification.date);
      return now >= notificationDate;
    });

    if (dueNotifications.length > 0) {
      setNotifications(dueNotifications);
    }
  }, [notifications, setNotifications]);

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={true}
          autoHideDuration={6000}
          onClose={() => setNotifications(notifications.filter((_, i) => i !== index))}
        >
          <Alert onClose={() => setNotifications(notifications.filter((_, i) => i !== index))} severity="info">
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default NotificationPopup;
