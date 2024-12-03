import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginForm = () => {
  const [cuid, setCuid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Vérifiez si l'utilisateur est connecté
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await loginUser(cuid, password);
      console.log("Connexion réussie");
      navigate("/dashboard"); // Redirection après connexion réussie
    } catch (error) {
      console.error("Erreur de connexion:", error.message);
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Bienvenue</h1>
        <p style={styles.subtitle}>Connectez-vous à votre compte</p>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nom d'utilisateur (CUID)</label>
          <input
            type="text"
            value={cuid}
            onChange={(e) => setCuid(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>
    </div>
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
  title: {
    fontSize: "2rem",
    color: "#333333",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666666",
    marginBottom: "1.5rem",
  },
  inputGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    fontSize: "0.9rem",
    color: "#555555",
    marginBottom: "0.5rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#ffffff",
    fontSize: "1rem",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
};

export default LoginForm;
