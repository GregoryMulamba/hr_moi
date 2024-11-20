// import axios from 'axios';

// const API_URL = 'http://localhost:8000/user/public/auth/'; // Assurez-vous que c'est l'URL correcte pour l'authentification

// // Création d'une instance Axios
// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Fonction pour se connecter (cuid, password)
// export const loginUser = async (cuid, password) => {
//   try {
//     const response = await apiClient.post('', { cuid, password }); // Envoi des identifiants pour l'authentification
//     if (response.data.access) {
//       // Si le token est renvoyé dans la réponse, le stocker dans localStorage
//       localStorage.setItem('authToken', response.data.access);
//       console.log('Token récupéré :', response.data.access);
//       return { success: true };
//     }
//     return { success: false, message: 'Identifiants invalides' }; // Si pas de token, message d'erreur
//   } catch (error) {
//     console.error(
//       'Erreur lors de la connexion :',
//       error.response ? error.response.data : error.message
//     );
//     return { success: false, message: 'Erreur de connexion' }; // Si une erreur se produit
//   }
// };
// // export const loginUser = async (cuid, password) => {
// //     try {
// //       const response = await fetch('/api/auth/login/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ cuid, password }),
// //       });
  
// //       const data = await response.json();
// //       if (response.ok) {
// //         // Stocker le token
// //         localStorage.setItem('authToken', data.token); // Remplacez "token" par la clé utilisée par votre backend
// //         return { success: true };
// //       } else {
// //         return { success: false, message: data.detail || 'Erreur de connexion' };
// //       }
// //     } catch (error) {
// //       return { success: false, message: 'Erreur réseau' };
// //     }
// //   };
  
// // Fonction pour vérifier si l'utilisateur est authentifié
// export const isAuthenticated = () => {
//   const token = localStorage.getItem('authToken'); // Vérifie la présence d'un token
//   return !!token; // Retourne `true` si le token existe, sinon `false`
// };

// // Fonction pour déconnecter l'utilisateur
// export const logoutUser = () => {
//   localStorage.removeItem('authToken'); // Supprime le token du stockage local
//   console.log('Déconnexion réussie');
// };
