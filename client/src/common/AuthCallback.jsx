import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hook/CustomHook';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';
const TOKEN_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000; // 1 year

const AuthCallback = () => {
  const navigate = useNavigate();

  const [token, setToken, clearToken] = useStorage(TOKEN_STORAGE_KEY, null, {
    type: 'local',
    expiresIn: TOKEN_EXPIRY_MS,
  });

  const [userDetails, setUserDetails, clearUserDetails] = useStorage(
    USER_STORAGE_KEY,
    null,
    { type: 'local', expiresIn: TOKEN_EXPIRY_MS }
  );

  const [snackbarOpen, setSnackbarOpen] = useStorage('snackbarOpen', false);

  const handleCloseSnackbar = (_event, reason) => {
    if (reason !== 'clickaway') {
      setSnackbarOpen(false);
    }
  };

  const parseAuthData = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success') === 'true';
    const resultData = params.get('result');

    try {
      const userData = resultData
        ? JSON.parse(decodeURIComponent(resultData))
        : null;

      const { accessToken, _json } = userData?.data || {};

      if (success && accessToken && _json) {
        setToken(accessToken);
        setUserDetails(_json);
        navigate('/admin');
      } else {
        throw new Error('Invalid authentication data');
      }
    } catch (error) {
      console.error('AuthCallback Error:', error);
      handleAuthFailure();
    }
  }, [navigate, setToken, setUserDetails]);

  const handleAuthFailure = useCallback(() => {
    clearToken();
    clearUserDetails();
    setSnackbarOpen(true);
    navigate('/login');
  }, [clearToken, clearUserDetails, navigate, setSnackbarOpen]);

  useEffect(() => {
    parseAuthData();
  }, [parseAuthData]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      color="text.primary"
      px={2}
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Redirecting...
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          User login failed. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthCallback;
