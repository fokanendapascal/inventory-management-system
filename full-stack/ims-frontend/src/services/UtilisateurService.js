import securedAxiosInstance from "./AxiosInstance";

const REST_API_USER = '/utilisateurs';

export const listUsers = async () => {
    const response = await securedAxiosInstance.get(`${REST_API_USER}/all`);
    return response.data;
} 

export const createUser = (user) => securedAxiosInstance.post(`${REST_API_USER}/create`, user);

export const updateUser = (userId, user) => securedAxiosInstance.put(`${REST_API_USER}/update/${userId}`, user);

export const getUserById = (userId) => securedAxiosInstance.get(`${REST_API_USER}/${userId}`);

export const getUserByEmail = (email) => securedAxiosInstance.get(`${REST_API_USER}/find-by-email/${email}`);

export const deleteUser = (userId) => securedAxiosInstance.delete(`${REST_API_USER}/delete/${userId}`);

export const changePassword = (changePasswordDto) => securedAxiosInstance.post(`${REST_API_USER}/changermotdepasse`, changePasswordDto);

export const getCurrentUser = () => securedAxiosInstance.get(`${REST_API_USER}/me`);
