import securedAxiosInstance from "./AxiosInstance";

const REST_API_ROLE = '/roles';

export const listRoles = () => securedAxiosInstance.get(`${REST_API_ROLE}/all`);

export const getRole = (roleId) => securedAxiosInstance.get(`${REST_API_ROLE}/${roleId}`);

export const createRole = (role) => securedAxiosInstance.post(`${REST_API_ROLE}/create`, role);

export const updateRole = (roleId, role) => securedAxiosInstance.put(`${REST_API_ROLE}/update/${roleId}`, role);

export const deleteRole = (roleId) => securedAxiosInstance.delete(`${REST_API_ROLE}/${roleId}`);