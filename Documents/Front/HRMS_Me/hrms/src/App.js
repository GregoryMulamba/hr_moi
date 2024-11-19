import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ProtectedRoute from "./utils/ProctectedRoute";
import Login from "./components/modules/login/Login";
import PerformanceDashboard from "./components/modules/admin/PerformanceDashboard";
import TrainingDashboard from "./components/modules/admin/trainingdashboard";
import EffectifDashboard from "./components/modules/admin/EffectifDashboard";
import HRISDashboard from "./components/modules/admin/HRISDashboard";
import MobilityDashboard from "./components/modules/admin/MobilityDashboard";
import SurveyDashboard from "./components/modules/admin/SurveyDashboard";
import RequestListAdmin from "./components/modules/admin/RequestListAdmin";
import ClientDashboard from "./components/modules/client/clientDashboard";
import { theme } from "./theme";
import "./App";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          {user && <Sidebar />}
          <div className="main-content">
            {user && <Topbar />}
            {user && <Navbar />}
            <Routes>
              {/* Connexion */}
              <Route path="/login" element={<Login setUser={setUser} />} />

              {/* Routes Admin */}
              <Route
                path="/performance"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <PerformanceDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/training"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <TrainingDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/effectif"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <EffectifDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hris"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <HRISDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mobility"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <MobilityDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/survey"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <SurveyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/requests"
                element={
                  <ProtectedRoute allowedRoles={["admin"]} user={user}>
                    <RequestListAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Routes Client */}
              <Route
                path="/client-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["client"]} user={user}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Par défaut */}
              <Route path="*" element={<Navigate to={user ? "/performance" : "/login"} />} />
            </Routes>
            {user && <Footer />}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
