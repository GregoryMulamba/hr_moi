import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const OnboardingDashboard = ({ employees = [] }) => {  // Default to an empty array if employees is undefined
  const [status, setStatus] = useState("Tous");

  const filteredEmployees = employees.filter((employee) => {
    if (status === "Tous") return true;
    return employee.status === status;
  });

  const columns = [
    { field: "fullName", headerName: "Nom Complet", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "department", headerName: "Département", width: 200 },
    { field: "startDate", headerName: "Date de Début", width: 150 },
    { field: "position", headerName: "Poste", width: 200 },
    { field: "status", headerName: "Statut", width: 150 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord de l'Onboarding
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total des Employés en Onboarding</Typography>
              <Typography variant="h3">{filteredEmployees.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Employés Terminés</Typography>
              <Typography variant="h3">
                {filteredEmployees.filter((employee) => employee.status === "Terminé").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Employés en Cours</Typography>
              <Typography variant="h3">
                {filteredEmployees.filter((employee) => employee.status === "En Cours").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={3}>
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default OnboardingDashboard;
