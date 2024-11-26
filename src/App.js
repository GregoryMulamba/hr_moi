import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';

// Modules de formation
import TrainingForm from './scenes/training/TrainingForm';
import TrainingProgress from './scenes/training/TrainingProgress';
import TrainingList from './scenes/training/TrainingList';
import TrainingDashboard from './scenes/training/TrainingDashboard';
import TrainingParticipation from './scenes/training/TrainingParticipation';
import Evaluation from './scenes/training/Evaluation';
import TrainingCalendar from './scenes/training/TrainingCalendar';

// Modules des employés et de l'effectif
import EffectifList from './scenes/effectif/EffectifList';
import DirectionList from './scenes/effectif/DirectionList';
import DirectionForm from './scenes/effectif/DirectionForm';
import ContratList from './scenes/effectif/ContratList';
import ContratForm from './scenes/effectif/ContratForm';
import EmployeurList from './scenes/effectif/EmployeurList';
import EmployeurForm from './scenes/effectif/EmployeurForm';
import AssignSubordinatesForm from './scenes/effectif/AssignSubordinatesForm';
import EffectifDashboard from './scenes/effectif/EffectifDashboard';

// Modules des demandes
import RequestDashboard from './scenes/Request/RequestDashboard';
import RequestForm from './scenes/Request/RequestForm';
import RequestList from './scenes/Request/RequestList';

// Modules de gestion des utilisateurs et authentification
import AdminView from './scenes/User/AdminView';
import Login from './scenes/User/Login';

// Modules Compliance
import LegalCompliance from './scenes/compliance/LegalCompliance';
import PrivacySettings from './scenes/compliance/PrivacySettings';

// Modules Performance
import PerformanceReview from './scenes/performance/PerformanceReview';
import PerformanceDashboard from './scenes/performance/PerformanceDashboard';

// Modules HRIS
import HRISDashboard from './scenes/hris/HRISDashboard';
import KPIs from './scenes/hris/KPIs';
import Analytics from './scenes/hris/Analytics';

// Modules Onboarding
import OnboardingForm from './scenes/onboarding/OnboardingForm';
import OnboardingDashboard from './scenes/onboarding/OnboardingDashboard';

// Modules Payroll
import PayrollDashboard from './scenes/payroll/PayrollDashboard';
import Payslips from './scenes/payroll/Payslips';

// Modules Survey
import SurveyForm from './scenes/surveys/SurveyForm';
import SurveyList from './scenes/surveys/SurveyList';
import SurveyResults from './scenes/surveys/SurveyResults';

import './index.css';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${isSidebar ? '' : 'collapsed'}`}>
          <Sidebar isSidebar={isSidebar} />
          <main className={`content ${isSidebar ? '' : 'collapsed'}`}>
            <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                {/* Routes pour la gestion des utilisateurs et l'authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminView />} />

                {/* Routes pour les modules de formation */}
                <Route path="/trainingdashboard" element={<TrainingDashboard />} />
                <Route path="/trainingform" element={<TrainingForm />} />
                <Route path="/trainingprogress" element={<TrainingProgress />} />
                <Route path="/traininglist" element={<TrainingList />} />
                <Route path="/trainingparticipation" element={<TrainingParticipation />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/calendar" element={<TrainingCalendar />} />

                {/* Routes pour les modules des employés */}
                <Route path="/effectiflist" element={<EffectifList />} />
                <Route path="/directionList" element={<DirectionList />} />
                <Route path="/directionForm" element={<DirectionForm />} />
                <Route path="/ContratList" element={<ContratList />} />
                <Route path="/ContratForm" element={<ContratForm />} />
                <Route path="/EmployeurList" element={<EmployeurList />} />
                <Route path="/EmployeurForm" element={<EmployeurForm />} />
                <Route path="/assign-subordinates" element={<AssignSubordinatesForm />} />
                <Route path="/effectifdashboard" element={<EffectifDashboard />} />

                {/* Routes pour les modules de demandes */}
                <Route path="/request-dashboard" element={<RequestDashboard />} />
                <Route path="/requestlist" element={<RequestForm />} />
                <Route path="/requestform" element={<RequestList />} />

                {/* Routes pour les modules Compliance */}
                <Route path="/legal-compliance" element={<LegalCompliance />} />
                <Route path="/privacy-settings" element={<PrivacySettings />} />

                {/* Routes pour les modules Performance */}
                <Route path="/performance-review" element={<PerformanceReview />} />
                <Route path="/performance-dashboard" element={<PerformanceDashboard />} />

                {/* Routes pour les modules HRIS */}
                <Route path="/hris-dashboard" element={<HRISDashboard />} />
                <Route path="/kpis" element={<KPIs />} />
                <Route path="/analytics" element={<Analytics />} />

                {/* Routes pour les modules Onboarding */}
                <Route path="/onboarding-form" element={<OnboardingForm />} />
                <Route path="/onboarding-dashboard" element={<OnboardingDashboard />} />

                {/* Routes pour les modules Payroll */}
                <Route path="/payroll-dashboard" element={<PayrollDashboard />} />
                <Route path="/payslips" element={<Payslips />} />

                {/* Routes pour les modules Survey */}
                <Route path="/survey-form" element={<SurveyForm />} />
                <Route path="/survey-list" element={<SurveyList />} />
                <Route path="/survey-results" element={<SurveyResults />} />
              </Routes>
          </main>
          <div className={`footer ${isSidebar ? '' : 'collapsed'}`}>
            &copy; {new Date().getFullYear()} ORDC
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
