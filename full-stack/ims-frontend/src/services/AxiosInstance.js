import axios from "axios";

const securedAxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/gestiondestock/v1'
});

// Ajouter un intercepteur de requête
securedAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        
        // Log ajouté pour vérifier la présence du token
        //console.log("État du Token dans localStorage:", token ? "Présent" : "Absent ou Vide");
        
        if (token && token !== "null" && token !== "undefined") {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Afficher les headers pour le débogage (à retirer en production)
        //console.log("Intercepteur Axios - Headers envoyés:", config.headers); 

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default securedAxiosInstance;