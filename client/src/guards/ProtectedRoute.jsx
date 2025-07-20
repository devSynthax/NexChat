// src/guards/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useStorage } from "../hook/CustomHook";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
  const [token] = useStorage("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
