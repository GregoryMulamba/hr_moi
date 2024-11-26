import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const benefitsData = [
  { id: 1, employee: "John Doe", healthInsurance: 300, transportation: 100 },
  { id: 2, employee: "Jane Smith", healthInsurance: 250, transportation: 120 },
  { id: 3, employee: "Samuel Lee", healthInsurance: 350, transportation: 90 },
  { id: 4, employee: "Laura Green", healthInsurance: 320, transportation: 110 },
];

const Benefits = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleExportBenefits = () => {
    const ws = XLSX.utils.json_to_sheet(benefitsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Benefits");
    XLSX.writeFile(wb, "EmployeeBenefits.xlsx");
    setSnackbarMessage("Avantages exportés avec succès !");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestion des Avantages
      </Typography>

      <Grid container spacing={3}>
        {benefitsData.map((benefit) => (
          <Grid item xs={12} md={6} key={benefit.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{benefit.employee}</Typography>
                <Typography variant="body1">
                  Assurance Santé: {benefit.healthInsurance} €
                </Typography>
                <Typography variant="body1">
                  Transport: {benefit.transportation} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleExportBenefits}
        style={{ marginTop: "20px" }}
      >
        Exporter les Avantages
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Benefits;
