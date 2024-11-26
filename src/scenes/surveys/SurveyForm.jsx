import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const SurveyForm = () => {
  const [surveyData, setSurveyData] = useState({
    surveyTitle: '',
    surveyDescription: '',
    surveyDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSurveyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit survey
    alert('Survey created successfully');
  };

  return (
    <Box>
      <Typography variant="h6">Create Survey</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Survey Title"
          name="surveyTitle"
          value={surveyData.surveyTitle}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Survey Description"
          name="surveyDescription"
          value={surveyData.surveyDescription}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Survey Date"
          name="surveyDate"
          type="date"
          value={surveyData.surveyDate}
          onChange={handleInputChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" type="submit">Submit Survey</Button>
      </form>
    </Box>
  );
};

export default SurveyForm;
