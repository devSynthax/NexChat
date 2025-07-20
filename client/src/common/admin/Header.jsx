import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useStorage } from '../../hook/CustomHook';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const [token, , clearToken] = useStorage('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    clearToken();          // Clear the stored token
    navigate('/');         // Redirect to home or login page
  };

  return (
    <AppBar position="fixed" color="primary" className="shadow-md">
      <Toolbar className="flex justify-between">
        <span className="text-lg font-semibold">Admin Panel</span>
        <div className="space-x-4">
          <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/admin/settings')}>Settings</Button>
          <Button color="inherit" onClick={handleLogout}>Logout Test Admin</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
