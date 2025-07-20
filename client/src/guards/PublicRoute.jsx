// src/guards/PublicRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useStorage } from "../hook/CustomHook";
import { Box, CircularProgress } from "@mui/material";

const PublicRoute = () => {
  const [token] = useStorage("token");

  return token ? <Navigate to="/admin" replace /> : <Outlet />;
};

export default PublicRoute;
