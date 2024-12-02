// CompetenceMatrix.jsx
import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const CompetenceMatrix = () => {
  const [matrixData, setMatrixData] = useState([
    { employee: "John Doe", skill1: "Advanced", skill2: "Intermediate", skill3: "Beginner" },
    { employee: "Jane Smith", skill1: "Intermediate", skill2: "Advanced", skill3: "Advanced" },
  ]);

  return (
    <Box p={3}>
      <h3>Matrice des Compétences</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell>Compétence 1</TableCell>
              <TableCell>Compétence 2</TableCell>
              <TableCell>Compétence 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matrixData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.employee}</TableCell>
                <TableCell>{row.skill1}</TableCell>
                <TableCell>{row.skill2}</TableCell>
                <TableCell>{row.skill3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompetenceMatrix;
