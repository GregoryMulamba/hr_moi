import axios from 'axios';

// URL de l'API
const API_URL = 'http://localhost:8000';

// Fonction pour récupérer le token stocké dans localStorage
const getToken = () => {
  return localStorage.getItem('access_token');
};

// Fonction pour se connecter et récupérer le token
export const loginUser = async (cuid, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/public/login/`, {
      cuid: cuid,
      password: password,
    });

    // Vérifier si le token est présent dans la réponse
    if (response.data && response.data.access) {
      const token = response.data.access;

      // Stocker le token dans le localStorage
      localStorage.setItem("access_token", token);

      console.log("Token stocké dans localStorage:", token);
      return response.data; // Retourner uniquement les données pertinentes
    } else {
      console.error("Aucun token reçu dans la réponse");
      throw new Error("Token d'accès manquant dans la réponse");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error.response?.data || error.message);
    throw error;
  }
};

export const postDataToAPI = async (endpoint, data) => {
  try {
    const token = getToken(); // Récupérer le token stocké
    console.log("token :", token)
    // Vérifie si le token existe
    if (!token) {
      throw new Error('Token d\'accès manquant');
    }

    const headers = {
      'Authorization': `JWT ${token}`,
      // 'Content-Type': 'application/json',
    };
    // la requête POST avec le token d'autorisation
    const response = await axios.post(`${API_URL}${endpoint}`, data, { headers });
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données à l\'API :', error);
    throw error;
  }
};

// Fonction pour effectuer une requête GET avec un token
export const fetchDataFromAPI = async (endpoint) => {
  try {
    const token = getToken(); 
    // Vérifie si le token existe
    if (!token) {
      throw new Error('Token d\'accès manquant');
    }
    const headers = {
      'Authorization': `JWT ${token}`,
    };
    const response = await axios.get(`${API_URL}${endpoint}`, { headers });
    // console.log('resultat:', response);
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API :', error);
    return {}; 
  }
};
export const updateDataToAPI = async (endpoint, data) => {
  try {
    const token = getToken(); // Récupérer le token stocké

    if (!token) {
      throw new Error('Token d\'accès manquant');
    }

    const headers = {
      'Authorization': `JWT ${token}`,
    };

    const response = await axios.put(`${API_URL}${endpoint}`, data, { headers });
    return response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données à l\'API :', error);
    throw error;
  }
};

// Fonction pour supprimer des données (DELETE)
export const deleteDataToAPI = async (endpoint) => {
  try {
    const token = getToken(); // Récupérer le token stocké

    if (!token) {
      throw new Error('Token d\'accès manquant');
    }

    const headers = {
      'Authorization': `JWT ${token}`,
    };

    const response = await axios.delete(`${API_URL}${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression des données :', error);
    throw error;
  }
};
export const fetchDataFromAPIWithParameters = async (endpoint, type_employeur = null) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}?employeur=${type_employeur}`);
    return response; 
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API :', error);
    return {}; 
  }
};

