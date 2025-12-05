import securedAxiosInstance from "./AxiosInstance";

const REST_API_CAT = '/category';

export const createCategory = (category) => securedAxiosInstance.post(`${REST_API_CAT}/create`, category);

export const listCategories = () => securedAxiosInstance.get(`${REST_API_CAT}/all`);

export const getCategory = (categoryId) => securedAxiosInstance.get(`${REST_API_CAT}/id/${categoryId}`);

export const getCategoryByCode = (categoryCode) => securedAxiosInstance.get(`${REST_API_CAT}/code/${categoryCode}`);

export const updateCategory = (categoryId, category) => securedAxiosInstance.put(`${REST_API_CAT}/update/${categoryId}`, category);

export const deleteCategory = (categoryId) => securedAxiosInstance.delete(`${REST_API_CAT}/delete/${categoryId}`);





