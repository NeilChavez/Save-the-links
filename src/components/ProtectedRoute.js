import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuthContext();
  if (loading) return <h2>Loading</h2>;
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
}
