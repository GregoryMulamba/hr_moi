import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer le hook useNavigate
import { loginUser } from "../api";

const LoginForm = () => {
  const [cuid, setCuid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Réinitialiser l'erreur avant chaque tentative
    try {
      await loginUser(cuid, password);
      console.log("Connexion réussie");
      navigate("/dashboard"); // Redirection vers le Dashboard après connexion réussie
    } catch (error) {
      console.error("Erreur de connexion:", error.message);
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Connexion</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>CUID</label>
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
    backgroundColor: "#f4f4f9",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#007BFF",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    marginBottom: "1rem",
    color: "red",
    fontSize: "0.9rem",
    textAlign: "center",
  },
};

export default LoginForm;
