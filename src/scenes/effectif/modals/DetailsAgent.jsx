import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#ff9800",
  color: "#fff",
  fontSize: "1.8rem",
  fontWeight: "bold",
  textAlign: "center",
  padding: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: "#fff3e0",
  padding: theme.spacing(4),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: "#fff3e0",
  padding: theme.spacing(2),
}));

const CloseButton = styled(Button)(({ theme }) => ({
  color: "#ff9800",
  fontWeight: "bold",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "#ffe0b2",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: theme.spacing(1),
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  color: "#444",
  lineHeight: "1.7",
  marginBottom: theme.spacing(1.5),
}));

const DetailsAgent = ({ open, onClose, agent }) => {
  if (!agent) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <InfoOutlined sx={{ mr: 1 }} /> Détails de l'Agent
      </StyledDialogTitle>
      <StyledDialogContent>
        
        <SectionTitle>Informations Personnelles</SectionTitle>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InfoText>Nom : {agent.name}</InfoText>
            <InfoText>Prénom : {agent.prenom}</InfoText>
            <InfoText>Postnom : {agent.postnom}</InfoText>
            <InfoText>Email : {agent.email}</InfoText>
            <InfoText>Téléphone : {agent.phone}</InfoText>
            <InfoText>Age : {agent.ageAgent}</InfoText>


          </Grid>
          <Grid item xs={6}>
            <InfoText>Direction : {agent.direction}</InfoText>
            <InfoText>Employeur : {agent.employeur}</InfoText>
            <InfoText>Numéro Matricule : {agent.num_mat}</InfoText>
            <InfoText>Lieu d'embauche : {agent.lieu_embauche}</InfoText>
            <InfoText>Lieu d'affectation : {agent.lieu_affectation}</InfoText>
            <InfoText>Tranche d'âge : {agent.age}</InfoText>

          </Grid>
        </Grid>

        <SectionTitle sx={{ mt: 3 }}>Détails de Contrat</SectionTitle>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InfoText>Contrat : {agent.contrat}</InfoText>
            <InfoText>Statut du Contrat : {agent.statut_contrat}</InfoText>
            <InfoText>Fonction : {agent.fonction}</InfoText>
            <InfoText>Ancienneté (années) : {agent.anciennete_annee}</InfoText>
            <InfoText>Ancienneté (mois) : {agent.anciennete_mois}</InfoText>
          </Grid>
          <Grid item xs={6}>
            <InfoText>Grade : {agent.grade}</InfoText>
            <InfoText>Date d'embauche : {agent.date_embauche}</InfoText>
            <InfoText>Date de Fin de Contrat : {agent.date_fin_cdd}</InfoText>
            <InfoText>Durée du Contrat CDD : {agent.dure_cdd}</InfoText>
            <InfoText>Période d'essai : {agent.periode_essai}</InfoText>
          </Grid>
        </Grid>

        <SectionTitle sx={{ mt: 3 }}>Manager et Subordonnés</SectionTitle>
        <Divider sx={{ mb: 2 }} />

        <InfoText>Manager : {agent.manager_name}</InfoText>
        
        <SectionTitle>N-1 :</SectionTitle>
        {agent.subordonnes && agent.subordonnes.length > 0 ? (
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            {agent.subordonnes.map((subordonne) => (
              <li key={subordonne.id} style={{ fontSize: "1.05rem", color: "#555" }}>{subordonne}</li>
            ))}
          </ul>
        ) : (
          <InfoText>Aucun n-1.</InfoText>
        )}
        
      </StyledDialogContent>
      <StyledDialogActions>
        <CloseButton onClick={onClose}>Fermer</CloseButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default DetailsAgent;
