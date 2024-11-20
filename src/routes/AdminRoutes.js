// src/routes/AdminRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../scenes/admin/AdminDashboard';
import TrainingAdmin from '../scenes/admin/TrainingAdmin';
import EffectifAdmin from '../scenes/admin/EffectifAdmin';
import RequestAdmin from '../scenes/admin/RequestAdmin';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/training" element={<TrainingAdmin />} />
      <Route path="/admin/effectif" element={<EffectifAdmin />} />
      <Route path="/admin/request" element={<RequestAdmin />} />
    </Routes>
  );
};

export default AdminRoutes;
