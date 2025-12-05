import axios from 'axios'; // Instance non-sécurisée pour les requêtes publiques
import securedAxiosInstance from "./AxiosInstance"; // Instance sécurisée pour les requêtes nécessitant un JWT

const BASE_URL = "http://localhost:8081/gestiondestock/v1"; 
const REST_API_AUTH = '/auth';

export const login = async (authRequest) => {
    const response = await axios.post(`${BASE_URL}${REST_API_AUTH}/authenticate`, authRequest);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const user = response.data.user; // contient prénom, email, roleName etc.

    if (accessToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    }

    return response;
};


// Déconnexion
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    console.log("Déconnexion réussie");
};

export const refreshToken = (refreshRequest) => securedAxiosInstance.post(`${REST_API_AUTH}/refresh`, refreshRequest);

// Vérifier si l’utilisateur est connecté
export const isLoggedIn = () => {
    return !!localStorage.getItem('token'); // Retourne true si le token existe
};

export const hasRole = (role) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.roleName === role;
};
