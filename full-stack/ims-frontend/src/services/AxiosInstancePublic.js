// AxiosInstancePublic.js
import axios from "axios";

const publicAxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/gestiondestock/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default publicAxiosInstance;