import React, { useState } from 'react';
import { TextField, Button, Divider, Paper, Box, Typography } from '@mui/material';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5" align="center">
              Login
            </Typography>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="py-2"
              fullWidth
            >
              Submit
            </Button>
            <div className="flex items-center my-2">
              <Divider className="flex-grow" />
              <span className="mx-2 text-sm text-gray-500">or</span>
              <Divider className="flex-grow" />
            </div>
            <Button
              variant="outlined"
              fullWidth
              className="py-2"
              // Replace this onClick with Google OAuth logic
              onClick={handleGoogleLogin}>
              Sign in with Google
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;