import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ManagerDashboard = () => {
  const employeeColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const mockEmployees = [
    { id: 1, name: "John Doe", department: "HR", status: "Active" },
    { id: 2, name: "Jane Smith", department: "IT", status: "On Leave" },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Widgets */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h3">{mockEmployees.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Employee List */}
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Employees Under Supervision
        </Typography>
        <DataGrid rows={mockEmployees} columns={employeeColumns} pageSize={5} disableSelectionOnClick />
      </Box>
    </Box>
  );
};

export default ManagerDashboard;
