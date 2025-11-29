import securedAxiosInstance from "./AxiosInstance";

const REST_API_FRS = '/fournisseurs';

export const listFournisseurs = () => securedAxiosInstance.get(`${REST_API_FRS}/all`);

export const createFournisseur = (fournisseur) => securedAxiosInstance.post(`${REST_API_FRS}/create`, fournisseur);

export const updateFournisseur = (fournisseurId, fournisseur) => securedAxiosInstance.put(`${REST_API_FRS}/update/${fournisseurId}`, fournisseur);

export const getFournisseur = (fournisseurId) => securedAxiosInstance.get(`${REST_API_FRS}/${fournisseurId}`);

export const deleteFournisseur = (fournisseurId) => securedAxiosInstance.delete(`${REST_API_FRS}/delete/${fournisseurId}`);
