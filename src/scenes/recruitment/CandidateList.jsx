import React, { useState } from "react";
import { Box, Typography, DataGrid, Button, Chip } from "@mui/material";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Jean Dupont", email: "jean@example.com", status: "En attente", job: "Développeur Web" },
    { id: 2, name: "Marie Curie", email: "marie@example.com", status: "Embauché", job: "Data Analyst" },
    { id: 3, name: "Albert Einstein", email: "albert@example.com", status: "Rejeté", job: "Physicien" },
  ]);

  const columns = [
    { field: "name", headerName: "Nom", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "job", headerName: "Poste", width: 200 },
    {
      field: "status",
      headerName: "Statut",
      width: 150,
      renderCell: (params) => (
        <Chip label={params.row.status} color={params.row.status === "Embauché" ? "success" : "warning"} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert(`Voir détails pour ${params.row.name}`)}
        >
          Voir
        </Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Liste des Candidats
      </Typography>
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid rows={candidates} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} />
      </Box>
    </Box>
  );
};

export default CandidateList;
