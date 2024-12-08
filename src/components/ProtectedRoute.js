// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permissions, requiredPermission, children }) => {
  if (!permissions[requiredPermission]) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
