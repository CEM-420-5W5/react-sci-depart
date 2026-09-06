import axios from "axios";

export const authenticatedRequest = axios.create();

authenticatedRequest.interceptors.request.use((config) => {

  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = "Bearer " + sessionStorage.getItem("token");

  return config;

});

// Intercepteur de réponse pour gérer les erreurs 401
authenticatedRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Effacer les données de session
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('playerId');
      sessionStorage.removeItem('playerName');

      // Rediriger vers la page de login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

