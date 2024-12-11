import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const localizer = momentLocalizer(moment);

const events = [
  // Exemple de données d'événements
  {
    title: 'Formation A',
    start: new Date(2024, 6, 10),
    end: new Date(2024, 6, 15),
    evaluation: new Date(2024, 6, 17)
  },
  {
    title: 'Formation B',
    start: new Date(2024, 6, 20),
    end: new Date(2024, 6, 25),
    evaluation: new Date(2024, 6, 27)
  },
];

const TrainingCalendar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    evaluation: ''
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    events.push({
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      evaluation: new Date(newEvent.evaluation)
    });
    setOpenDialog(false);
    setNewEvent({ title: '', start: '', end: '', evaluation: '' });
  };

  return (
    <Box m="20px">
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Training
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Start Date"
            name="start"
            type="date"
            value={newEvent.start}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="End Date"
            name="end"
            type="date"
            value={newEvent.end}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Evaluation Date"
            name="evaluation"
            type="date"
            value={newEvent.evaluation}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt="20px" height="600px">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={['month', 'week', 'day', 'agenda']}
        />
      </Box>
    </Box>
  );
};

export default TrainingCalendar;
