import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { green, red, blue } from "@mui/material/colors";
import * as XLSX from "xlsx";

const payrollData = [
  { id: 1, name: "John Doe", salary: 5000, bonus: 1500, status: "Paid" },
  { id: 2, name: "Jane Smith", salary: 4500, bonus: 1200, status: "Pending" },
  { id: 3, name: "Samuel Lee", salary: 5200, bonus: 1800, status: "Paid" },
  { id: 4, name: "Laura Green", salary: 4800, bonus: 1100, status: "Pending" },
];

const PayrollDashboard = () => {
  const [payroll, setPayroll] = useState(payrollData);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(payroll);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payroll");
    XLSX.writeFile(wb, "PayrollData.xlsx");
  };

  const columns = [
    { field: "name", headerName: "Nom", width: 200 },
    { field: "salary", headerName: "Salaire", width: 150 },
    { field: "bonus", headerName: "Bonus", width: 150 },
    {
      field: "status",
      headerName: "Statut",
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let color = red[500];
        if (status === "Paid") color = green[500];
        if (status === "Pending") color = blue[500];
        return <Chip label={status} style={{ backgroundColor: color, color: "white" }} />;
      },
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard de la Paie
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Salaires</Typography>
              <Typography variant="h3">{payroll.reduce((sum, employee) => sum + employee.salary, 0)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Bonus</Typography>
              <Typography variant="h3">{payroll.reduce((sum, employee) => sum + employee.bonus, 0)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Employés Payés</Typography>
              <Typography variant="h3">
                {payroll.filter((employee) => employee.status === "Paid").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={3} style={{ height: 400, width: "100%" }}>
        <DataGrid rows={payroll} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleExportExcel}
        style={{ marginTop: "20px" }}
      >
        Exporter vers Excel
      </Button>
    </Box>
  );
};

export default PayrollDashboard;
