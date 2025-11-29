import axios from "axios";

const securedAxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/gestiondestock/v1'
});

// Ajouter un intercepteur de requête
securedAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        
        if (token) {
            // Ajouter le jeton à l'en-tête Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default securedAxiosInstance;