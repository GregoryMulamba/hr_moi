import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";

// Importation des modules (fichiers de votre projet)
import TrainingDashboard from "./scenes/training/TrainingDashboard";
import TrainingList from "./scenes/training/TrainingList";
import EffectifDashboard from "./scenes/effectif/EffectifDashboard";
import HRISDashboard from "./scenes/hris/HRISDashboard";
import RequestDashboard from "./scenes/Request/RequestDashboard";
import SurveyList from "./scenes/surveys/SurveyList";
import PerformanceDashboard from "./scenes/performance/PerformanceDashboard";
import OnboardingDashboard from "./scenes/onboarding/OnboardingDashboard";
import PayrollDashboard from "./scenes/payroll/PayrollDashboard";
import CompetenceMatrix from "./scenes/skills/CompetenceMatrix";
import JobProfiles from "./scenes/skills/JobProfiles";
import MobilityTracking from "./scenes/mobility/MobilityTracking";
import LegalCompliance from "./scenes/compliance/LegalCompliance";
import PrivacySettings from "./scenes/compliance/PrivacySettings";
import Login from "./scenes/User/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true); // Contrôle de l'état de la sidebar
  const [userRole, setUserRole] = useState(null); // Rôle de l'utilisateur sélectionné
  const [userName, setUserName] = useState(""); // Nom de l'utilisateur
  const [isModalOpen, setIsModalOpen] = useState(true); // Contrôle de l'affichage du modal

  // Gestion de la sélection du rôle
  const handleRoleSelection = () => {
    // Valider que userName et userRole ne sont pas vides
    if (userRole && userName.trim() !== "") {
      setIsModalOpen(false); // Fermer le modal
    } else {
      alert("Veuillez remplir tous les champs avant de valider.");
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${isSidebar ? "" : "collapsed"}`}>
          {/* Sidebar */}
          {userRole && <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}
          <main className={`content ${isSidebar ? "" : "collapsed"}`}>
            {/* Topbar */}
            {userRole && <Topbar userName={userName} />}

            {/* Modal de sélection du rôle */}
            {isModalOpen && (
              <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 300,
                  }}
                >
                  <Typography variant="h5" align="center" mb={2}>
                    Sélectionner un Rôle
                  </Typography>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Rôle</InputLabel>
                    <Select
                      value={userRole || ""}
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      <MenuItem value="admin">Administrateur</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="agent">Agent</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="user-name">Nom d'utilisateur</InputLabel>
                    <input
                      id="user-name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        marginTop: "10px",
                      }}
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRoleSelection}
                    disabled={!userRole || !userName}
                  >
                    Valider
                  </Button>
                </Box>
              </Modal>
            )}

            {/* Routes */}
            {!isModalOpen && (
              <Routes>
                {/* Routes pour Admin */}
                {userRole === "admin" && (
                  <>
                    <Route path="/trainingdashboard" element={<TrainingDashboard />} />
                    <Route path="/effectifdashboard" element={<EffectifDashboard />} />
                    <Route path="/hrisdashboard" element={<HRISDashboard />} />
                    <Route path="/requestdashboard" element={<RequestDashboard />} />
                    <Route path="/surveys" element={<SurveyList />} />
                    <Route path="/performancedashboard" element={<PerformanceDashboard />} />
                    <Route path="/onboardingdashboard" element={<OnboardingDashboard />} />
                    <Route path="/payrolldashboard" element={<PayrollDashboard />} />
                    <Route path="/competence-matrix" element={<CompetenceMatrix />} />
                    <Route path="/job-profiles" element={<JobProfiles />} />
                    <Route path="/mobility-tracking" element={<MobilityTracking />} />
                    <Route path="/legal-compliance" element={<LegalCompliance />} />
                    <Route path="/privacy-settings" element={<PrivacySettings />} />
                  </>
                )}

                {/* Routes pour Manager */}
                {userRole === "manager" && (
                  <>
                    <Route path="/trainingdashboard" element={<TrainingDashboard />} />
                    <Route path="/effectifdashboard" element={<EffectifDashboard />} />
                    <Route path="/requestdashboard" element={<RequestDashboard />} />
                    <Route path="/surveys" element={<SurveyList />} />
                    <Route path="/competence-matrix" element={<CompetenceMatrix />} />
                  </>
                )}

                {/* Routes pour Agent */}
                {userRole === "agent" && (
                  <>
                    <Route path="/trainingdashboard" element={<TrainingDashboard />} />
                    <Route path="/requestdashboard" element={<RequestDashboard />} />
                  </>
                )}

                {/* Routes par défaut */}
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            )}
          </main>
          <footer className={`footer ${isSidebar ? "" : "collapsed"}`}>
            &copy; {new Date().getFullYear()} ORDC
          </footer>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
