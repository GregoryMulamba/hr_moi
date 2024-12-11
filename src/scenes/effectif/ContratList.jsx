import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import {
  fetchDataFromAPI,
  postDataToAPI,
  updateDataToAPI,
  deleteDataToAPI,
} from "../../api";
import ContratForm from "./ContratForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ContratList = () => {
  const [contratData, setContratData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchContratData(); // Utilisation de useEffect pour charger les données initiales
  }, []);

  const fetchContratData = async () => {
    try {
      // Appel de l'API
      const response = await fetchDataFromAPI("/effectif/contrat/");
      console.log("Full response:", response); // Log de la réponse complète

      // Vérification du format des données
      if (response.data && Array.isArray(response.data)) {
        setContratData(response.data);
      } else if (response.data && Array.isArray(response.data.results)) {
        setContratData(response.data.results);
      } else {
        console.error("Invalid data format:", response);
        setContratData([]); // Mise à jour de l'état avec un tableau vide si le format est incorrect
      }
    } catch (error) {
      console.error("Error fetching contrat data:", error);
      setContratData([]); // Mise à jour de l'état avec un tableau vide en cas d'erreur
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editMode) {
        await updateDataToAPI(`/effectif/contrat/${formData.id}/`, formData);
        setSnackbarMessage("Contrat mise à jour avec succès");
      } else {
        await postDataToAPI("/effectif/contrat/creer_/", formData);
        setSnackbarMessage("Contrat ajoutée avec succès");
      }
      fetchContratData(); // Recharger les données après soumission
      setEditMode(false);
      setOpenDialog(false);
      setFormData({
        id: '',
        type_contrat: '',
        nature_contrat: '',
        filiere_metier: '',
        probation_end_date: '', // Nouvelle date de probation
        agent_name: '', // ID de l'agent
        date_debut: '', // Date de début
        date_fin_cdd: '', // Date de fin pour CDD
        document: '', // Le champ pour le fichier
        is_active: '',
      });
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting contrat form:", error);
      setSnackbarMessage("Erreur lors de la soumission");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (contrat) => {
    console.log("Editing contrat:", contrat); // Log
    setFormData({ ...contrat });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contrat?")) {
      try {
        await deleteDataToAPI(`/effectif/contrat/${id}/`);
        fetchContratData(); // Recharger les données après suppression
        setSnackbarMessage("Contrat supprimée avec succès");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error deleting contrat:", error);
        setSnackbarMessage("Erreur lors de la suppression");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(contratData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ContratList");
    XLSX.writeFile(wb, "ContratList.xlsx");
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setContratData(json);
          setSnackbarMessage("Data imported successfully");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
        } catch (error) {
          setSnackbarMessage("Error importing data");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 0 },
    { field: "type_contrat", headerName: "Type contrat", width: 100 },
    { field: "nature_contrat", headerName: "nature_contrat", width: 100 },
    { field: "filiere_metier", headerName: "filiere_metier", width: 100 },
    { field: "probation_end_date", headerName: "probation_end_date", width: 100 },
    { field: "agent_name", headerName: "agent_name", width: 100 },
    { field: "date_debut", headerName: "date_debut", width: 100 },
    { field: "date_fin_cdd", headerName: "date_fin_cdd", width: 100 },
    { field: "document", headerName: "document", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: "10px" }}>
            <EditIcon />
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setFormData({
      id: '',
      type_contrat: '',
      nature_contrat: '',
      filiere_metier: '',
      probation_end_date: '', // Nouvelle date de probation
      agent_name: '', // ID de l'agent
      date_debut: '', // Date de début
      date_fin_cdd: '', // Date de fin pour CDD
      document: '', // Le champ pour le fichier
      is_active: '',
    });
  };

  return (
    <Box m="10px">
      <Header title="Contrat List" subtitle="Liste des contrats" />
      <Box m="10px 0">
        <ContratForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          editMode={editMode}
        />
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Ajouter contrat
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportExcel}
          style={{ marginLeft: "5px" }}>
          Exporter vers Excel
        </Button>
        <input
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          id="import-excel"
          type="file"
          onChange={handleImportExcel}
        />
        <label htmlFor="import-excel">
          <Button
            variant="contained"
            component="span"
            style={{ marginLeft: "5px" }}>
            Importer depuis Excel
          </Button>
        </label>
      </Box>
      <Box height="70vh">
        <DataGrid
          rows={contratData}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          width={"30 px"}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContratList;
