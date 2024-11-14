import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#ff9800", // Couleur orange
  color: "#fff",
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: "#fff3e0", // Couleur orange clair
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: "#fff3e0", // Couleur orange clair
  padding: theme.spacing(2),
}));

const CloseButton = styled(Button)(({ theme }) => ({
  color: "#ff9800", // Couleur orange
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#ffe0b2", // Couleur orange clair en hover
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "&.MuiTypography-h6": {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333", // Couleur du texte pour les titres
  },
  "&.MuiTypography-body1": {
    fontSize: "0.95rem",
    color: "#555", // Couleur du texte pour le contenu
    lineHeight: "1.6",
  },
}));

const DetailsAgent = ({ open, onClose, agent }) => {
  if (!agent) return null;
  console.log(`agents sub : ${JSON.stringify(agent)}`);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <InfoOutlined sx={{ mr: 1 }} /> Détails de l'Agent
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledTypography variant="h6">Nom : {agent.name}</StyledTypography>
        <StyledTypography variant="body1">
          Prénom : {agent.prenom}
        </StyledTypography>
        <StyledTypography variant="body1">
          Postnom : {agent.postnom}
        </StyledTypography>
        <StyledTypography variant="body1">
          Email : {agent.email}
        </StyledTypography>
        <StyledTypography variant="body1">
          Téléphone : {agent.phone}
        </StyledTypography>
        <StyledTypography variant="body1">
          Direction : {agent.direction}
        </StyledTypography>
        <StyledTypography variant="body1">
          Employeur : {agent.employeur}
        </StyledTypography>
        <StyledTypography variant="body1">
          Numéro Matricule : {agent.num_mat}
        </StyledTypography>
        <StyledTypography variant="body1">
          Date de Naissance : {agent.date_naissance}
        </StyledTypography>
        <StyledTypography variant="body1">
          Contrat : {agent.contrat}
        </StyledTypography>
        <StyledTypography variant="body1">
          Statut du Contrat : {agent.statut_contrat}
        </StyledTypography>
        <StyledTypography variant="body1">
          Fonction : {agent.fonction}
        </StyledTypography>
        <StyledTypography variant="body1">
          Ancienneté (années) : {agent.anciennete_annee}
        </StyledTypography>
        <StyledTypography variant="body1">
          Ancienneté (mois) : {agent.anciennete_mois}
        </StyledTypography>
        <StyledTypography variant="body1">
          Date de Départ : {agent.date_depart}
        </StyledTypography>
        <StyledTypography variant="body1">
          Lieu d'embauche : {agent.lieu_embauche}
        </StyledTypography>
        <StyledTypography variant="body1">
          Lieu d'affectation : {agent.lieu_affectation}
        </StyledTypography>
        <StyledTypography variant="body1">
          Grade : {agent.grade}
        </StyledTypography>
        <StyledTypography variant="body1">
          Date d'embauche : {agent.date_embauche}
        </StyledTypography>
        <StyledTypography variant="body1">
          Date de Fin de Contrat : {agent.date_fin_cdd}
        </StyledTypography>
        <StyledTypography variant="body1">
          Durée du Contrat CDD : {agent.dure_cdd}
        </StyledTypography>
        <StyledTypography variant="body1">
          Période d'essai : {agent.periode_essai}
        </StyledTypography>
        <StyledTypography variant="body1">
          Manager : {agent.manager_name}
        </StyledTypography>

        {/* Affichage des subordonnés */}
        <StyledTypography variant="h6">N-1 :</StyledTypography>
        {agent.subordonnes && agent.subordonnes.length > 0 ? (
          <ul>
            <div>
              {agent.subordonnes.map((subordonne) => (
                  <a  key={subordonne.id}>
                    <li> {subordonne}</li>
                   
                  </a>
              ))}
            </div>
          </ul>
        ) : (
          <StyledTypography variant="body1">Aucun n-1.</StyledTypography>
        )}
      </StyledDialogContent>
      <StyledDialogActions>
        <CloseButton onClick={onClose}>Fermer</CloseButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default DetailsAgent;
