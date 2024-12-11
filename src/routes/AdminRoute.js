import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../scenes/Admin/AdminDashboard.jsx';
import TrainingAdmin from '../scenes/Admin/TrainingAdmin';
import EffectifAdmin from '../scenes/Admin/EffectifAdmin';
import RequestAdmin from '../scenes/Admin/RequestAdmin';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Chemin par défaut pour /admin */}
      <Route path="/" element={<AdminDashboard />} />
      {/* Sous-routes de /admin */}
      <Route path="training" element={<TrainingAdmin />} />
      <Route path="effectif" element={<EffectifAdmin />} />
      <Route path="request" element={<RequestAdmin />} />
    </Routes>
  );
};

export default AdminRoutes;
