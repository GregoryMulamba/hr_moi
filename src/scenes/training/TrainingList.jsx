import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";

import * as XLSX from "xlsx";
import { fetchDataFromAPI } from "../../api";
import TrainingForm from "./TrainingForm";

const TrainingList = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    titre: "",
    date_debut: "",
    date_fin: "",
    stream: "",
    mode: "",
    categorie: "",
    description: "",
    cible: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchTrainingData(); // Utilisation de useEffect pour charger les données initiales
  }, []);

  const fetchTrainingData = async () => {
    try {
      // Appel de l'API
      const response = await fetchDataFromAPI("/formation/formation/");
      console.log("Full response:", response); // Log de la réponse complète

      // Vérification du format des données
      if (response.data && Array.isArray(response.data)) {
        setTrainingData(response.data);
      } else if (response.data && Array.isArray(response.data.results)) {
        setTrainingData(response.data.results);
      } else {
        console.error("Invalid data format:", response);
        setTrainingData([]); // Mise à jour de l'état avec un tableau vide si le format est incorrect
      }
    } catch (error) {
      console.error("Error fetching training data:", error);
      setTrainingData([]); // Mise à jour de l'état avec un tableau vide en cas d'erreur
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (new Date(formData.date_fin) < new Date(formData.date_debut)) {
      setSnackbarMessage("End date cannot be before start date");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    if (editMode) {
      const updatedList = trainingData.map((training) =>
        training.id === formData.id
          ? {
              ...formData,
              duration: calculateDuration(
                formData.date_debut,
                formData.date_fin
              ),
            }
          : training
      );
      setTrainingData(updatedList);
    } else {
      const newTraining = {
        ...formData,
        id: trainingData.length + 1,
        duration: calculateDuration(formData.date_debut, formData.date_fin),
      };
      setTrainingData([...trainingData, newTraining]);
    }
    setFormData({
      id: "",
      titre: "",
      date_debut: "",
      date_fin: "",
      stream: "",
      mode: "",
      categorie: "",
      description: "",
      cible: "",
    });
    setEditMode(false);
    setOpenDialog(false);
    setSnackbarMessage(
      editMode ? "Training updated successfully" : "Training added successfully"
    );
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleEdit = (training) => {
    console.log("Editing training:", training); // Log
    setFormData({ ...training });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      const updatedList = trainingData.filter((training) => training.id !== id);
      setTrainingData(updatedList);
      setSnackbarMessage("Training deleted successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
  };

  const handleTypeChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      stream: event.target.value,
    }));
  };

  const calculateDuration = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return difference;
    }
    return "";
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(trainingData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TrainingList");
    XLSX.writeFile(wb, "TrainingList.xlsx");
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
          setTrainingData(json);
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
    { field: "id", headerName: "ID", width: 90 },
    { field: "titre", headerName: "Titre", width: 150 },
    { field: "date_debut", headerName: "Date Début", width: 150 },
    { field: "date_fin", headerName: "Date Fin", width: 150 },
    { field: "stream", headerName: "Stream", width: 150 },
    { field: "mode", headerName: "Mode", width: 150 },
    { field: "categorie", headerName: "Categorie", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "cible", headerName: "Cible", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}>
            Delete
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
      id: "",
      titre: "",
      date_debut: "",
      date_fin: "",
      stream: "",
      mode: "",
      categorie: "",
      description: "",
      cible: "",
    });
  };
  return (
    <Box m="20px">
      <Header title="Training List" subtitle="Liste de toutes les formations" />
      <Box m="10px 0">
        <TrainingForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleTypeChange={handleTypeChange}
          handleFormSubmit={handleFormSubmit}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          editMode={editMode}
        />{" "}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          style={{ marginLeft: "5px" }}>
          ajouter formation
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
            Importer vers Excel
          </Button>
        </label>
        <label htmlFor="import-excel">
          <Button
            variant="contained"
            component="span"
            style={{ marginLeft: "5px" }}>
            Importer vers Excel
          </Button>
        </label>
        <Button
          variant="contained"
          component="span"
          startIcon={<RefreshIcon />}
          style={{ marginLeft: "5px" }}></Button>
      </Box>
      <Box height="70vh">
        <DataGrid
          rows={trainingData}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
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

export default TrainingList;
