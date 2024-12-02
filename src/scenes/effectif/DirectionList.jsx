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
import DirectionForm from "./DirectionForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const DirectionList = () => {
  const [directionData, setDirectionData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    short_name: "",
    is_directeur: "",
    hrbp_id: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchDirectionData(); // Utilisation de useEffect pour charger les données initiales
  }, []);

  const fetchDirectionData = async () => {
    try {
      // Appel de l'API
      const response = await fetchDataFromAPI("/effectif/direction/");
      console.log("Full response:", response); // Log de la réponse complète

      // Vérification du format des données
      if (response.data && Array.isArray(response.data)) {
        setDirectionData(response.data);
      } else if (response.data && Array.isArray(response.data.results)) {
        setDirectionData(response.data.results);
      } else {
        console.error("Invalid data format:", response);
        setDirectionData([]); // Mise à jour de l'état avec un tableau vide si le format est incorrect
      }
    } catch (error) {
      console.error("Error fetching direction data:", error);
      setDirectionData([]); // Mise à jour de l'état avec un tableau vide en cas d'erreur
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
        await updateDataToAPI(`/effectif/direction/${formData.id}/`, formData);
        setSnackbarMessage("Direction mise à jour avec succès");
      } else {
        await postDataToAPI("/effectif/direction/creer_direction/", formData);
        setSnackbarMessage("Direction ajoutée avec succès");
      }
      fetchDirectionData(); // Recharger les données après soumission
      setEditMode(false);
      setOpenDialog(false);
      setFormData({
        id: "",
        name: "",
        short_name: "",
        is_directeur: "",
        hrbp_id: "",
        description: "",
      });
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting direction form:", error);
      setSnackbarMessage("Erreur lors de la soumission");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (direction) => {
    console.log("Editing direction:", direction); // Log
    setFormData({ ...direction });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this direction?")) {
      try {
        await deleteDataToAPI(`/effectif/direction/${id}/`);
        fetchDirectionData(); // Recharger les données après suppression
        setSnackbarMessage("Direction supprimée avec succès");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error deleting direction:", error);
        setSnackbarMessage("Erreur lors de la suppression");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(directionData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DirectionList");
    XLSX.writeFile(wb, "DirectionList.xlsx");
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
          setDirectionData(json);
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
    { field: "name", headerName: "Nom", width: 150 },
    { field: "short_name", headerName: "Short name", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "hrbp_id", headerName: "HRBP", width: 150 },
    { field: "is_directeur", headerName: "Directeur", width: 200 },
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
      id: "",
      name: "",
      short_name: "",
      description: "",
    });
  };

  return (
    <Box m="20px">
      <Header
        title="Direction List"
        subtitle="Liste de toutes les directions"
      />
      <Box m="10px 0">
        <DirectionForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          editMode={editMode}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          style={{ marginLeft: "5px" }}>
          Ajouter direction
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
          rows={directionData}
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

export default DirectionList;
