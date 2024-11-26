import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const SurveyResults = () => {
  // Données d'enquête directement définies ici
  const surveyResults = {
    labels: ['Satisfied', 'Neutral', 'Dissatisfied'],  // Catégories des réponses
    data: [60, 30, 10],  // Répartition des réponses en pourcentages
  };

  // Vérification des données avant de tenter de les utiliser
  if (!surveyResults.labels || !surveyResults.data || !Array.isArray(surveyResults.data)) {
    console.error('Invalid surveyResults data');
    return <Typography color="error">Failed to load survey results</Typography>;
  }

  const pieData = {
    labels: surveyResults.labels,
    datasets: [
      {
        data: surveyResults.data,  // Données à afficher dans le graphique
        backgroundColor: ['#2196f3', '#4caf50', '#ff9800'], // Couleurs pour chaque section du graphique
      },
    ],
  };

  const barData = {
    labels: surveyResults.labels,
    datasets: [
      {
        label: 'Survey Results',
        data: surveyResults.data,
        backgroundColor: ['#2196f3', '#4caf50', '#ff9800'],
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Survey Results
      </Typography>
      
      {/* Doughnut Chart */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Doughnut 
          data={pieData} 
          options={{
            maintainAspectRatio: false, // Permet aux graphiques de s'ajuster à l'espace
            responsive: true, 
            plugins: {
              legend: { 
                position: 'top' 
              }
            },
          }} 
          height={200} // Taille réduite pour le Doughnut Chart
        />
      </Box>

      {/* Bar Chart */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Bar 
          data={barData} 
          options={{
            maintainAspectRatio: false, // Permet aux graphiques de s'ajuster à l'espace
            responsive: true
          }} 
          height={200} // Taille réduite pour le Bar Chart
        />
      </Box>
    </Box>
  );
};

export default SurveyResults;
