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
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import RequestForm from "./RequestForm";
import { fetchDataFromAPI, updateDataToAPI } from "../../api";
import TransferIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ValiderRequestModal from "./Modals/ValiderRequestModal";
import RejeterRequestModal from "./Modals/RejeterRequestModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const getDocumentIcon = (extension) => {
  switch (extension.toLowerCase()) {
    case 'pdf': return <PictureAsPdfIcon />;
    case 'docx':
    case 'doc': return <DescriptionIcon />;
    case 'xlsx': return <InsertDriveFileIcon />;
    default: return <InsertDriveFileIcon />;
  }
};


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
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
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
              id: demande.id + 1,
              // id: demande.id,
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
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenValiderModal = (request) => {
    setSelectedRequest(request);
    setOpenValiderModal(true);
  };

  const handleOpenRejeterModal = (request) => {
    setSelectedRequest(request);
    setOpenRejeterModal(true);
  };
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
    const fileExtension = docUrl.split('.').pop();  // Extraction de l'extension
    const fileName = docUrl.split("/").pop(); // Nom du fichier
    setCurrentDocument({
      name: fileName,
      url: docUrl,
      extension: fileExtension,
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
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ bgcolor: "orange", color: "white" }}>
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
                "& .detail-label": { fontWeight: "bold", color: "black" },
              }}
            >
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
                      sx={{ textTransform: "none", p: 0 }}
                    >
                      {getDocumentIcon(doc.split('.').pop())} {doc.split("/").pop()}
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
        <DialogActions sx={{ p: 3 }}>
          {/* Section principale */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Tooltip title="Valider">
                <Button
                  variant="outlined"
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    borderColor: "#4caf50",
                    color: "#4caf50",
                    "&:hover": { borderColor: "#388e3c", backgroundColor: "#e8f5e9" },
                  }}
                  onClick={() => handleOpenValiderModal(selectedRequest)}
                >
                  Valider
                </Button>
                <ValiderRequestModal
                  open={openValiderModal}
                  onClose={() => setOpenValiderModal(false)}
                  selectedRequest={selectedRequest}
                  requests={requests}
                  setRequests={setRequests}
                  setAlert={setAlert}
                />
              </Tooltip>

              <Tooltip title="Réjeter">
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  sx={{
                    borderColor: "#f44336",
                    color: "#f44336",
                    "&:hover": { borderColor: "#d32f2f", backgroundColor: "#ffebee" },
                  }}
                  onClick={() => handleOpenRejeterModal(selectedRequest)}
                >
                  Réjeter
                </Button>
                <RejeterRequestModal
                  open={openRejeterModal}
                  onClose={() => setOpenRejeterModal(false)}
                  selectedRequest={selectedRequest}
                  requests={requests}
                  setRequests={setRequests}
                  setAlert={setAlert}
                />
              </Tooltip>
            </Box>

            {/* Section secondaire avec menu déroulant */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Tooltip title="Autres actions">
                <IconButton
                  size="large"
                  sx={{ backgroundColor: "#f0f0f0", color: "#000", "&:hover": { backgroundColor: "#e0e0e0" } }}
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    maxHeight: 200,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={() => handleTakeRequest(selectedRequest.id)}>
                  <HandshakeIcon sx={{ mr: 1 }} />
                  Prendre la main
                </MenuItem>
                <MenuItem onClick={() => handleTransfertByMembreRequest(selectedRequest.id)}>
                  <ArrowForwardIcon sx={{ mr: 1 }} />
                  Passer la main
                </MenuItem>
                <MenuItem onClick={() => handleTransfertRequest(selectedRequest.id)}>
                  <AssignmentIcon sx={{ mr: 1 }} />
                  Assigner
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Bouton Fermer */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Fermer">
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                sx={{
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": { borderColor: "#333", backgroundColor: "#f5f5f5" },
                }}
                onClick={handleCloseDialog}
              >
                Fermer
              </Button>
            </Tooltip>
          </Box>
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
