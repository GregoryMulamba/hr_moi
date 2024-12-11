import React, { useState } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre les données du formulaire
    console.log(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { mb: 2 },
        backgroundColor: colors.primary[400],
        padding: 3,
        borderRadius: '5px',
      }}
    >
      <Typography variant="h5" color={colors.grey[100]} gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        fullWidth
        required
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
