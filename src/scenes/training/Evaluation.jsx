import React, { useState } from 'react';
import {
  Container, Button, Menu, MenuItem, Typography, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EvaluationEfficacite from './EvaluationEfficacite';
import Evaluationchaud from './Evaluationchaud';
import Header from '../../components/Header';

const Evaluation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [efficaciteData, setEfficaciteData] = useState([]);
  const [chaudData, setChaudData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenForm = (type) => {
    setSelectedForm(type);
    setOpen(true);
    handleCloseMenu();
  };

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedForm(null);
  };

  const handleSave = (newEvaluation) => {
    if (selectedForm === 'Efficacité') {
      setEfficaciteData((prevData) => [...prevData, { ...newEvaluation, id: prevData.length + 1 }]);
    } else if (selectedForm === 'à Chaud') {
      setChaudData((prevData) => [...prevData, { ...newEvaluation, id: prevData.length + 1 }]);
    }
    handleCloseForm();
  };

  const columnsEfficacite = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'question1', headerName: 'Avez-vous constaté un changement ?', width: 250 },
    { field: 'question2', headerName: 'Effet immédiat dans la gestion ?', width: 250 },
    { field: 'question3', headerName: 'Amélioration des compétences ?', width: 250 },
    { field: 'question4', headerName: 'Valeur sur le marché du travail ?', width: 250 },
    { field: 'question5', headerName: 'Les objectifs ont été atteints ?', width: 250 },
    { field: 'question6', headerName: 'En adéquation avec la mission du poste ?', width: 250 },
    { field: 'question7', headerName: 'Formation complémentaire nécessaire ?', width: 250 },
    { field: 'question8', headerName: 'Retours concernant le cabinet ?', width: 250 },
    { field: 'question9', headerName: 'Connaissances nouvellement acquises ?', width: 250 },
    { field: 'question10', headerName: 'Recommandations pour l’organisation ?', width: 250 },
    { field: 'commentaires', headerName: 'Commentaires', width: 300 },
  ];

  const columnsChaud = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'question1', headerName: 'Le formateur est compétent ?', width: 250 },
    { field: 'question2', headerName: 'Le formateur est patient et enthousiaste ?', width: 250 },
    { field: 'question3', headerName: 'Le formateur est attentif et adaptatif ?', width: 250 },
    { field: 'question4', headerName: 'Les objectifs de la formation sont présentés ?', width: 250 },
    { field: 'question5', headerName: 'Le déroulement a facilité la compréhension ?', width: 250 },
    { field: 'question6', headerName: 'Les méthodes sont stimulantes ?', width: 250 },
    { field: 'question7', headerName: 'La durée est appropriée ?', width: 250 },
    { field: 'question8', headerName: 'Les documents matériels sont utiles ?', width: 250 },
    { field: 'question9', headerName: 'L’environnement est propice ?', width: 250 },
    { field: 'question10', headerName: 'Le timing est approprié ?', width: 250 },
    { field: 'commentaires', headerName: 'Commentaires', width: 300 },
  ];

  return (
    <Container>
      <Header title="Évaluation des Formations" />
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Évaluation des Formations
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Sélectionner le type d'évaluation
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleOpenForm('Efficacité')}>Évaluation d'Efficacité</MenuItem>
          <MenuItem onClick={() => handleOpenForm('à Chaud')}>Évaluation à Chaud</MenuItem>
        </Menu>
      </Paper>

      <Dialog open={open} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle>{selectedForm === 'Efficacité' ? "Évaluation d'Efficacité" : "Évaluation à Chaud"}</DialogTitle>
        <DialogContent>
          {selectedForm === 'Efficacité' && <EvaluationEfficacite onSave={handleSave} />}
          {selectedForm === 'à Chaud' && <Evaluationchaud onSave={handleSave} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" gutterBottom>
        Évaluations d'Efficacité
      </Typography>
      <Paper elevation={3} sx={{ height: 400, marginTop: 2 }}>
        <DataGrid
          rows={efficaciteData}
          columns={columnsEfficacite}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Évaluations à Chaud
      </Typography>
      <Paper elevation={3} sx={{ height: 400, marginTop: 2 }}>
        <DataGrid
          rows={chaudData}
          columns={columnsChaud}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </Container>
  );
};

export default Evaluation;
