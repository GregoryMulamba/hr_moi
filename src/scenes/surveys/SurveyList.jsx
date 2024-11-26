import React from 'react';
import { Box, Button, Typography, Chip, Grid } from '@mui/material';
import { green, red } from '@mui/material/colors';

const SurveyList = ({ surveys = [], setSurveys, handleEditSurvey }) => {
  const handleDeleteSurvey = (id) => {
    const updatedSurveys = surveys.filter((survey) => survey.id !== id);
    setSurveys(updatedSurveys);
  };

  // Si surveys n'est pas un tableau valide
  if (!Array.isArray(surveys)) {
    console.error('Invalid surveys data');
    return <Typography color="error">Failed to load surveys data</Typography>;
  }

  // Données fictives incluses directement dans le composant pour test
  const mockSurveys = [
    { id: 1, title: 'Employee Satisfaction Survey', description: 'Survey to measure employee satisfaction levels', status: 'active' },
    { id: 2, title: 'Customer Feedback Survey', description: 'Survey to gather feedback from customers', status: 'inactive' },
    { id: 3, title: 'Product Feedback Survey', description: 'Survey for gathering feedback on products', status: 'active' },
  ];

  // Si surveys est vide, afficher un message
  const surveysToDisplay = surveys.length > 0 ? surveys : mockSurveys;

  return (
    <Box mt={3}>
      <Typography variant="h4" gutterBottom>
        List of Surveys
      </Typography>
      {surveysToDisplay.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No surveys available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {surveysToDisplay.map((survey) => (
            <Grid item xs={12} sm={6} md={4} key={survey.id}>
              <Box p={3} border={1} borderRadius={2} borderColor="grey.300">
                <Typography variant="h6">{survey.title}</Typography>
                <Typography variant="body2">{survey.description}</Typography>
                <Chip
                  label={survey.status === 'active' ? 'Active' : 'Inactive'}
                  color={survey.status === 'active' ? 'success' : 'error'}
                  sx={{ marginTop: 2 }}
                />
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={() => handleEditSurvey(survey)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteSurvey(survey.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SurveyList;
