// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext"; // Ajuste o caminho se necessário
import { Redirect } from "react-router-dom"; // Se você estiver usando react-router v5, ou use `Navigate` para v6

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    // Redireciona se não estiver autenticado
    return <Redirect to="/login" />; // Para v5
    // Para react-router v6 use: return <Navigate to="/login" />;
  }

  return children; // Renderiza os filhos se autenticado
};

export default ProtectedRoute;
