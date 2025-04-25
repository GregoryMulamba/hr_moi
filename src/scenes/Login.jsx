import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { TextField, Button, Snackbar, Alert, Box, Typography } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import logoImage from './utils/assets/telco_logo.png'
const LoginForm = () => {
  const [cuid, setCuid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await loginUser(cuid, password);
      console.log("Connexion réussie");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion:", error.message);
      setError("Nom d'utilisateur ou mot de passe incorrect");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={styles.container}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        {/* Espace pour le logo */}
        <Box sx={styles.logoContainer}>
          <img
          src={logoImage}
          alt="Logo"
          style={styles.logo}
          />
        </Box>
        <Typography variant="h4" sx={styles.title}>Bienvenue sur MaxRH</Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          Connectez-vous à votre compte
        </Typography>
        <Box sx={styles.inputGroup}>
          <TextField
            label="Nom d'utilisateur (CUID)"
            variant="outlined"
            fullWidth
            value={cuid}
            onChange={(e) => setCuid(e.target.value)}
            InputProps={{
              startAdornment: <AccountCircle color="primary" />,
            }}
            required
          />
        </Box>
        <Box sx={styles.inputGroup}>
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <Lock color="primary" />,
            }}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={styles.button}>
          Se connecter
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  logo: {
    width: "80px", // Taille ajustable selon les besoins
    height: "auto",
  },
  title: {
    marginBottom: "0.5rem",
    color: "#333333",
  },
  subtitle: {
    marginBottom: "1.5rem",
    color: "#666666",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  button: {
    padding: "0.75rem",
    marginTop: "1rem",
  },
};

export default LoginForm;
