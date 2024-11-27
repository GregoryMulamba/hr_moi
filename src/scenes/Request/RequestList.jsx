import React, { useState, useEffect } from "react";
import { Box, Button, Alert, AlertTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import RequestForm from "./RequestForm";
import { fetchDataFromAPI, updateDataToAPI } from "../../api";
import PanToolIcon from "@mui/icons-material/PanTool";
import TransferIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
const RequestList = () => {
  const [requests, setRequests] = useState([]); // État pour les données de l'API
  const [alert, setAlert] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fonction de formatage des dates
  const formatDate = (dateString) =>
    dateString
      ? new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(dateString))
      : "Non spécifiée";

  // Appel API pour récupérer les données
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetchDataFromAPI("/demande/Demande/");
        if (response.data && Array.isArray(response.data.results)) {
          console.log("resultat :", response.data.results);
        }

        // Transformation des données pour correspondre aux colonnes
        const transformedData = response.data.results.map((demande, index) => ({
          id: index + 1,
          id: demande.id,
          assigned_to: demande.assigned_to || "Non assigné",
          groupe: demande.groupe || "Non défini",
          ticket: demande.ticket,
          type_demande: demande.type_demande ? `${demande.type_demande} ` : "",
          demande_owner: demande.demande_owner || "Inconnu",
          description: demande.description || "Pas de description",
          documentsRequired: demande.fichier_joint
            ? [demande.fichier_joint]
            : [],
          sla: demande.sla ? `${demande.sla} heures` : "Non défini",
          status: demande.status,
          date_creation: formatDate(demande.date_creation),
          date_assignation: formatDate(demande.date_assignation),
        }));

        console.log("transformedData :", transformedData);
        setRequests(transformedData);
      } catch (error) {
        setAlert({
          severity: "error",
          title: "Erreur",
          message: `Impossible de récupérer les demandes : ${error.message}`,
        });
      }
    };

    fetchRequests();
  }, []);

  // Exportation vers Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(requests);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Requests");
    XLSX.writeFile(wb, "Requests.xlsx");
    setAlert({
      severity: "success",
      title: "Succès",
      message: "Données exportées avec succès en Excel",
    });
  };

  // Colonnes pour la DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "assigned_to", headerName: "Assigné à", width: 150 },
    { field: "groupe", headerName: "Groupe", width: 180 },
    { field: "ticket", headerName: "Ticket", width: 120 },
    { field: "type_demande", headerName: "Type de Demande", width: 200 },
    { field: "demande_owner", headerName: "Demandeur", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "documentsRequired",
      headerName: "Documents Requis",
      width: 250,
      renderCell: (params) => {
        const files = params.row.documentsRequired;
        if (files.length > 0) {
          return files.map((file) => (
            <Button
              key={params.row.id + "-" + file} // Identifiant unique pour chaque bouton
              variant="outlined"
              color="primary"
              size="small"
              href={file} // Lien direct vers le fichier
              target="_blank" // Ouvre le fichier dans un nouvel onglet
              startIcon={<VisibilityIcon />}
              style={{ marginRight: "10px" }}></Button>
          ));
        }
        return <span>Aucun fichier</span>;
      },
    },
    { field: "sla", headerName: "SLA (Délai)", width: 150 },
    { field: "status", headerName: "Statut", width: 150 },
    { field: "date_creation", headerName: "Date de Création", width: 180 },
    { field: "date_assignation", headerName: "Date d'Assignation", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleTakeRequest(params.row.id)}
            style={{ marginRight: "10px" }}>
            <PanToolIcon /> {/* Icône de main */}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleTransfertRequest(params.row.id)}
            style={{ marginRight: "10px" }}>
            <TransferIcon /> {/* Icône de transfert */}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleCloseRequest(params.row.id)}
            startIcon={<CloseIcon />} // Icône de fermeture
            style={{ marginRight: "10px" }}>
            {/* Pas de texte, juste l'icône */}
          </Button>
        </>
      ),
    },
  ];

  // Prendre en charge une demande

  const handleTakeRequest = async (id) => {
    try {
      // Appel à l'API pour mettre à jour le statut de la demande
      const response = await updateDataToAPI(
        `/demande/Demande/${id}/prendre_main/`,
        {}
      );
      console.log("prise en main réussi.");
      // Mettre à jour le tableau de demandes dans l'état local après la mise à jour réussie
      const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request } : request
      );

      // Mise à jour de l'état des demandes
      setRequests(updatedRequests);

      // Affichage d'une alerte de succès
      setAlert({
        severity: "info",
        title: "Info",
        message: "Demande prise en charge avec succès",
      });
    } catch (error) {
      // Gestion des erreurs en cas d'échec de la mise à jour de la demande
      console.error("Erreur lors de la mise à jour de la demande:", error);

      // Affichage d'une alerte d'erreur
      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Erreur lors de la prise en charge de la demande : ${error.message}`,
      });
    }
  };

  const handleTransfertRequest = async (id) => {
    try {
      const response = await updateDataToAPI(
        `/demande/Demande/${id}/transferer/`,
        {}
      );

      console.log("Demande transférée avec succès.");

      // Utilisez les données retournées par le backend pour mettre à jour l'état local
      const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request, ...response.data } : request
      );

      setRequests(updatedRequests);

      setAlert({
        severity: "info",
        title: "Info",
        message: "Demande prise en charge avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la demande:", error);

      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Erreur lors de la prise en charge de la demande : ${error.message}`,
      });
    }
  };

  const handleCloseRequest = async (id) => {
    try {
      // Appel API pour fermer la demande
      const response = await updateDataToAPI(
        `/demande/Demande/${id}/fermer/`,
        {}
      );
      console.log("Demande fermée avec succès.");

      // Mettre à jour les données dans l'état local
      const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request, status: "Fermé" } : request
      );
      setRequests(updatedRequests);

      // Afficher une alerte de succès
      setAlert({
        severity: "info",
        title: "Succès",
        message: "Demande fermée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la fermeture de la demande:", error);

      // Afficher une alerte d'erreur
      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Erreur lors de la fermeture de la demande : ${error.message}`,
      });
    }
  };

  // // Supprimer une demande
  // const handleDelete = (id) => {
  //   if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
  //     const updatedRequests = requests.filter((request) => request.id !== id);
  //     setRequests(updatedRequests);
  //     setAlert({
  //       severity: "success",
  //       title: "Succès",
  //       message: "Demande supprimée avec succès",
  //     });
  //   }
  // };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Box m="20px">
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      )}

      <Box mb="10px" display="flex" justifyContent="space-between">
        <RequestForm openDialog={openDialog} style={{ marginLeft: "10px" }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportExcel}
          style={{ marginRight: "10px" }}>
          Exporter en Excel
        </Button>
      </Box>

      <Box
        height="70vh"
        sx={{
          overflowX: "auto",
          overflowY: "auto",
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
        }}>
        <DataGrid
          rows={requests}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default RequestList;
