import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted credentials:', credentials); // Ajoutez un log pour déboguer

    // Simple check to simulate authentication
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      console.log('Authentication successful'); // Log success
      setIsAuthenticated(true);
      navigate('/');
    } else {
      console.log('Authentication failed'); // Log failure
      alert('Invalid username or password');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
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
              value={credentials.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
