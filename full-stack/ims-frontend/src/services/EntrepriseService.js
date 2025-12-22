import securedAxiosInstance from "./AxiosInstance";
import publicAxiosInstance from "./AxiosInstancePublic";

const REST_API_COMPANY = '/entreprises';

export const listCompanies = () => securedAxiosInstance.get(`${REST_API_COMPANY}/all`);

export const getCompany = (companyId) => securedAxiosInstance.get(`${REST_API_COMPANY}/${companyId}`);

export const createCompany = (company) => {
    console.log("Données reçues par le service :", company);
    
    return publicAxiosInstance.post(`${REST_API_COMPANY}/create`, company)
        .catch(error => {
            console.log("Erreur backend :", error.response?.data); 
        });
} 

export const updateCompany = (companyId, company) => securedAxiosInstance.put(`${REST_API_COMPANY}/update/${companyId}`, company);

export const deleteCompany = (companyId) => securedAxiosInstance.delete(`${REST_API_COMPANY}/${companyId}`);