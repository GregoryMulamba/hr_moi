import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Slide,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import RequestForm from "./RequestForm";
import { fetchDataFromAPI, updateDataToAPI } from "../../api";
import PanToolIcon from "@mui/icons-material/PanTool";
import TransferIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ValiderRequestModal from "./Modals/ValiderRequestModal";
import RejeterRequestModal from "./Modals/RejeterRequestModal";
// Animation pour la modale
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// Modale des détails du document
const DocumentDetailDialog = ({ open, onClose, document }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ bgcolor: "info.main", color: "white" }}>
      Détails du Document
    </DialogTitle>
    <DialogContent sx={{ p: 3 }}>
      <Typography>
        <strong>Nom du document :</strong> {document.name}
      </Typography>
      <Typography>
        <strong>Lien :</strong>{" "}
        <a href={document.url} target="_blank" rel="noopener noreferrer">
          Télécharger le document
        </a>
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" color="inherit" onClick={onClose}>
        Fermer
      </Button>
    </DialogActions>
  </Dialog>
);

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [alert, setAlert] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [openValiderModal, setOpenValiderModal] = useState(false);
  const [openRejeterModal, setOpenRejeterModal] = useState(false);


  const formatDate = (dateString) =>
    dateString
      ? new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(dateString))
      : "Non spécifiée";

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetchDataFromAPI("/demande/Demande/");
        if (response.data && Array.isArray(response.data.results)) {
          const transformedData = response.data.results.map(
            (demande, index) => ({
              id: index + 1,
              id: demande.id,
              assigned_to: demande.assigned_to || "Non assigné",
              groupe: demande.groupe || "Non défini",
              ticket: demande.ticket,
              type_demande: demande.type_demande
                ? `${demande.type_demande} `
                : "",
              demande_owner: demande.demande_owner || "Inconnu",
              description: demande.description || "Pas de description",
              documentsRequired: demande.fichier_joint
                ? [demande.fichier_joint]
                : [],
              sla: demande.sla ? `${demande.sla} heures` : "Non défini",
              status: demande.status,
              date_creation: formatDate(demande.date_creation),
              date_assignation: formatDate(demande.date_assignation),
            })
          );

          setRequests(transformedData);
        }
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

  const handleTransfertByMembreRequest = async (id) => {
    try {
      const response = await updateDataToAPI(
        `/demande/Demande/${id}/transferer_entre_membres/`,
        {}
      );
      const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request, ...response.data } : request
      );
      setRequests(updatedRequests);
      setAlert({
        severity: "info",
        title: "Info",
        message: "La main est passée avec succès",
      });
    } catch (error) {
      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Aucun autre membre disponible pour ce groupe : ${error.message}`,
      });
    }
  };
  const handleTakeRequest = async (id) => {
    try {
      const response = await updateDataToAPI(
        `/demande/Demande/${id}/prendre_en_main_par_membre/`,
        {}
      );
      const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request } : request
      );
      setRequests(updatedRequests);
      setAlert({
        severity: "info",
        title: "Info",
        message: "Demande prise en charge avec succès",
      });
    } catch (error) {
      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Erreur lors de la prise en charge de la demande : ${error.message}`,
      });
    }
  };

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setOpenValiderModal(true);
    setOpenRejeterModal(true);

  };
  // const handleValiderRequest = async (id) => {
  //   try {
  //     const response = await updateDataToAPI(
  //       `/demande/Demande/${id}/valider_demande/`,
  //       {}
  //     );
  //     const updatedRequests = requests.map((request) =>
  //       request.id === id ? { ...request } : request
  //     );
  //     setRequests(updatedRequests);
  //     setAlert({
  //       severity: "info",
  //       title: "Info",
  //       message: "Demande validée avec avec succès et l'agent a été notifié.e",
  //     });
  //   } catch (error) {
  //     setAlert({
  //       severity: "error",
  //       title: "Erreur",
  //       message: `Erreur lors de la validation de la demande : ${error.message}`,
  //     });
  //   }
  // };
  const handleTransfertRequest = async (id) => {
    try {
      const response = await updateDataToAPI(
        `/demande/Demande/${id}/transferer_par_hrbp/`,
        {}
      );
      const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request, ...response.data } : request
      );
      setRequests(updatedRequests);
      setAlert({
        severity: "info",
        title: "Info",
        message: "Demande transférée avec succès",
      });
    } catch (error) {
      setAlert({
        severity: "error",
        title: "Erreur",
        message: `Erreur lors du transfert de la demande : ${error.message}`,
      });
    }
  };

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleDocumentClick = (docUrl) => {
    setCurrentDocument({
      name: docUrl.split("/").pop(), // Nom du fichier
      url: docUrl,
    });
    setDocumentDialogOpen(true);
  };

  const handleDocumentDialogClose = () => {
    setDocumentDialogOpen(false);
    setCurrentDocument(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "assigned_to", headerName: "Assigné à", width: 150 },
    // { field: "groupe", headerName: "Groupe", width: 180 },
    // { field: "ticket", headerName: "Ticket", width: 120 },
    { field: "type_demande", headerName: "Type de Demande", width: 200 },
    { field: "demande_owner", headerName: "Demandeur", width: 150 },
    // { field: "description", headerName: "Description", width: 300 },
    { field: "sla", headerName: "SLA (Délai)", width: 150 },
    { field: "status", headerName: "Statut", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleOpenDialog(params.row)}>
          Voir les détails
        </Button>
      ),
    },
  ];

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
          pageSize={100}
          rowsPerPageOptions={[10, 20, 50, 100]}
          autoHeight
          disableSelectionOnClick
        />
      </Box>

      {/* Modale pour les détails */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}>
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
          Détails de la Demande
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedRequest && (
            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={2}
              sx={{
                "& .MuiTypography-root": { mb: 1 },
                "& .detail-label": { fontWeight: "bold", color: "info.main" },
              }}>
              <Typography>
                <span className="detail-label">ID:</span> {selectedRequest.id}
              </Typography>
              <Typography>
                <span className="detail-label">Assigné à:</span>{" "}
                {selectedRequest.assigned_to}
              </Typography>
              <Typography>
                <span className="detail-label">Groupe:</span>{" "}
                {selectedRequest.groupe}
              </Typography>
              <Typography>
                <span className="detail-label">Ticket:</span>{" "}
                {selectedRequest.ticket}
              </Typography>
              <Typography>
                <span className="detail-label">Type de Demande:</span>{" "}
                {selectedRequest.type_demande}
              </Typography>
              <Typography>
                <span className="detail-label">Demandeur:</span>{" "}
                {selectedRequest.demande_owner}
              </Typography>
              <Typography>
                <span className="detail-label">Description:</span>{" "}
                {selectedRequest.description}
              </Typography>
              <Typography>
                <span className="detail-label">Documents Requis:</span>{" "}
                {selectedRequest.documentsRequired.length > 0 ? (
                  selectedRequest.documentsRequired.map((doc, idx) => (
                    <Button
                      key={idx}
                      variant="text"
                      color="info"
                      onClick={() => handleDocumentClick(doc)}
                      sx={{ textTransform: "none", p: 0 }}>
                      {doc.split("/").pop()}
                    </Button>
                  ))
                ) : (
                  "Aucun fichier"
                )}
              </Typography>
              <Typography>
                <span className="detail-label">SLA:</span> {selectedRequest.sla}
              </Typography>
              <Typography>
                <span className="detail-label">Statut:</span>{" "}
                {selectedRequest.status}
              </Typography>
              <Typography>
                <span className="detail-label">Date de Création:</span>{" "}
                {selectedRequest.date_creation}
              </Typography>
              <Typography>
                <span className="detail-label">Date d'Assignation:</span>{" "}
                {selectedRequest.date_assignation}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", p: 3 }}>
          <Box>

            <div>
              {selectedRequest ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleOpenModal(selectedRequest)}
                  sx={{ mr: 2 }}
                >
                  Valider 
                </Button>
              ) : (
                <p>Aucune demande sélectionnée.</p>
              )}

              {/* Modal pour valider la demande */}
              <ValiderRequestModal
                open={openValiderModal}
                onClose={() => setOpenValiderModal(false)}
                selectedRequest={selectedRequest}
                requests={[selectedRequest]}
                setRequests={(updatedRequests) => console.log('Updated:', updatedRequests)}
                setAlert={setAlert}
              />
            </div>
            <div>
              {selectedRequest ? (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleOpenModal(selectedRequest)}
                  sx={{ mr: 2 }}
                >
                  Réjeter
                </Button>
              ) : (
                <p>Aucune demande sélectionnée.</p>
              )}

              {/* Modal pour valider la demande */}
              <RejeterRequestModal
                open={openValiderModal}
                onClose={() => setOpenRejeterModal(false)}
                selectedRequest={selectedRequest}
                requests={[selectedRequest]}
                setRequests={(updatedRequests) => console.log('Updated:', updatedRequests)}
                setAlert={setAlert}
              />
            </div>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleTakeRequest(selectedRequest.id)}
              sx={{ mr: 2 }}>
              Prendre en main
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => handleTransfertByMembreRequest(selectedRequest.id)}
              sx={{ mr: 2 }}>
              Passer la main
            </Button>

            <Button
              variant="contained"
              color="info"
              onClick={() => handleTransfertRequest(selectedRequest.id)}>
              Assigner
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseDialog}
            sx={{ ml: 2 }}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modale pour les documents */}
      {currentDocument && (
        <DocumentDetailDialog
          open={documentDialogOpen}
          onClose={handleDocumentDialogClose}
          document={currentDocument}
        />
      )}
    </Box>
  );
};

export default RequestList;
