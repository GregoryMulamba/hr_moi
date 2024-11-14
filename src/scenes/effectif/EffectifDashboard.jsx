import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Modal,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Doughnut, Bar } from 'react-chartjs-2';
import { fetchDataFromAPI } from "../../api";
import * as XLSX from "xlsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TurnoverChart from "./components/TurnoverFilter";

const EffectifDashboard = () => {
  const [employeurs, setEmployeurs] = useState({});
  const [statutsContrat, setStatutsContrat] = useState({});
  const [typesContrat, setTypesContrat] = useState({});
  const [agents, setAgents] = useState([]);
  const [grades, setGrades] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployeur, setSelectedEmployeur] = useState(null);
  const [turnoverData, setTurnoverData] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetchEffectifData();
    fetchStatutContratData();
    fetchGradesData();
    fetchTypesContratData();
    fetchTurnoverData();
  }, []);

  const fetchEffectifData = async () => {
    try {
      const response = await fetchDataFromAPI("/effectif/agent/count_by_genre/");
      setEmployeurs(response.data);
    } catch (error) {
      console.error("Error fetching employeurs data:", error);
    }
  };

  const fetchGradesData = async () => {
    try {
      const response = await fetchDataFromAPI("/effectif/agent/count_by_grade/");
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades data:", error);
    }
  };

  const fetchStatutContratData = async () => {
    try {
      const response = await fetchDataFromAPI("/effectif/agent/count_by_statut_contrat/");
      setStatutsContrat(response.data);
    } catch (error) {
      console.error("Error fetching statut contrat data:", error);
    }
  };

  const fetchAgentsByEmployeur = async (employeur) => {
    try {
      const response = await fetchDataFromAPI(`/effectif/agent?employeur=${employeur}`);
      const filteredAgents = response.data.results.filter(
        (agent) => agent.employeur.type_employeur === employeur
      );
      setAgents(filteredAgents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setAgents([]);
    }
  };

  const fetchTypesContratData = async () => {
    try {
      const response = await fetchDataFromAPI("/effectif/agent/count_by_contrat/");
      setTypesContrat(response.data);
    } catch (error) {
      console.error("Error fetching types contrat data:", error);
      setTypesContrat({});
    }
  };

  const fetchTurnoverData = async () => {
    try {
      const response = await fetchDataFromAPI("/effectif/agent/turnover_mensuel/");
      setTurnoverData(response.data);
    } catch (error) {
      console.error("Error fetching turnover data:", error);
    }
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  const handleExportExcel = () => {
    const dataToExport = agents.map((agent) => ({
      Nom: agent.name || "",
      Prénom: agent.prenom,
      Email: agent.user ? agent.user.email : "",
      Fonction: agent.fonction,
      Direction: agent.direction ? agent.direction.name : "",
      "Numéro matricule": agent.num_mat || "",
      "Lieu d'embauche": agent.lieu_embauche || "",
      Contrat: agent.contrat ? agent.contrat.type_contrat : "",
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Agents");
    XLSX.writeFile(wb, "Agents_Export.xlsx");
  };

  // Données pour les graphiques
  const contractData = {
    labels: ['CDI', 'CDD', 'Expats', 'Stagiaires', 'Prestataires'],
    datasets: [
      {
        data: [
          typesContrat.CDI || 0,
          typesContrat.CDD || 0,
          typesContrat.Expats || 0,
          typesContrat.Stagiaires || 0,
          typesContrat.Prestataires || 0,
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const turnoverChartData = {
    labels: turnoverData.map((entry) => entry.month),
    datasets: [
      {
        label: 'Taux de Rotation',
        data: turnoverData.map((entry) => entry.turnover),
        backgroundColor: '#FF6384',
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord des Effectifs
      </Typography>

      <Grid container spacing={3}>
        {/* Total Staff */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Staff</Typography>
              <Typography variant="h4">{Object.values(employeurs).reduce((sum, val) => sum + (val.homme + val.femme), 0)}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOpenModal('staffDetails')}
              >
                Voir Plus
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Taux d'Attrition */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Taux d'Attrition</Typography>
              <Typography variant="h4">10%</Typography> {/* Exemple, calcul à faire dynamiquement */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOpenModal('attritionDetails')}
              >
                Voir Plus
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Types de Contrats */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Types de Contrats</Typography>
              <Doughnut data={contractData} />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOpenModal('contractDetails')}
              >
                Voir Plus
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Section pour le graphique de turnover */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Taux de Rotation Mensuel
        </Typography>
        <TurnoverChart data={turnoverData} />
      </Box>

      {openModal && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "95%",
              maxWidth: 1000,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}>
            {/* Contenu dynamique pour les Modals */}
            {modalContent === 'staffDetails' && (
              <Typography variant="h5">Détails du Staff</Typography>
            )}
            {modalContent === 'attritionDetails' && (
              <Typography variant="h5">Détails du Taux d'Attrition</Typography>
            )}
            {modalContent === 'contractDetails' && (
              <Typography variant="h5">Détails des Types de Contrats</Typography>
            )}
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                onClick={handleExportExcel}
                variant="contained"
                color="primary">
                Exporter
              </Button>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}>
                Fermer
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default EffectifDashboard;
