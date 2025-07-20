// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import PageNotFound from "./pages/404/PageNotFound";
import AuthCallback from "./common/AuthCallback";
import ProfilePage from "./admin/dashboard/ProfilePage";
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
