import React, { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import * as XLSX from "xlsx";

const payslipsData = [
  { id: 1, employee: "John Doe", month: "January", salary: 5000, bonus: 1500 },
  { id: 2, employee: "Jane Smith", month: "January", salary: 4500, bonus: 1200 },
  { id: 3, employee: "Samuel Lee", month: "February", salary: 5200, bonus: 1800 },
  { id: 4, employee: "Laura Green", month: "February", salary: 4800, bonus: 1100 },
];

const Payslips = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleExportPayslips = () => {
    const ws = XLSX.utils.json_to_sheet(payslipsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payslips");
    XLSX.writeFile(wb, "PayslipsData.xlsx");
    setSnackbarMessage("Fiches de paie exportées avec succès !");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Fiches de Paie
      </Typography>

      <Box>
        <Button variant="contained" color="primary" onClick={handleExportPayslips}>
          Exporter les Fiches de Paie
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Payslips;
