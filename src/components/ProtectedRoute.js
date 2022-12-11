import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) return <h2>Loading</h2>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}
