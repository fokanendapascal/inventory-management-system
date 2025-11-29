import securedAxiosInstance from './AxiosInstance';

const REST_API_CLT = '/clients';

export const listClients = () => securedAxiosInstance.get(REST_API_CLT + '/all');

export const createClient = (client) => securedAxiosInstance.post(`${REST_API_CLT}/create`, client);

export const updateClient = (clientId, client) => securedAxiosInstance.put(`${REST_API_CLT}/update/${clientId}`, client);

export const getClient = (cliendId) => securedAxiosInstance.get(`${REST_API_CLT}/${cliendId}`);

export const deleteClient = (clientId) => securedAxiosInstance.delete(`${REST_API_CLT}/delete/${clientId}`);

