import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, currentAdmin, adminError } = useAdmin();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (currentAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LockOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography component="h1" variant="h5">
              Railway Admin Portal
            </Typography>
          </Box>
          
          {(error || adminError) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error || adminError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In as Admin'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 