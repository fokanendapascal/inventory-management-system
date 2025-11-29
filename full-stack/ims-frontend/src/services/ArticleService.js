import securedAxiosInstance from "./AxiosInstance";

const REST_API_ART = '/articles';

export const createArticle = (article) => securedAxiosInstance.post(`${REST_API_ART}/create`, article);

export const listArticles = () => securedAxiosInstance.get(`${REST_API_ART}/all`);

export const getArticle = (articleId) => securedAxiosInstance.get(`${REST_API_ART}/id/${articleId}`);

export const getArticleByCode = (articleCode) => securedAxiosInstance.get(`${REST_API_ART}/code/${articleCode}`);

export const getHistoriqueVentes = (articleId) => securedAxiosInstance.get(`${REST_API_ART}/historique/vente/${articleId}`);

export const getHistoriqueCmdsClts = (articleId) => securedAxiosInstance.get(`${REST_API_ART}/historique/commandeclient/${articleId}`);

export const getHistoriqueCmdsFrs = (articleId) => securedAxiosInstance.get(`${REST_API_ART}/historique/commandefournisseur/${articleId}`);

export const getAllArticleByIdCategory = (idCategory) => securedAxiosInstance.get(`${REST_API_ART}/filter/category/${idCategory}`);

export const deleteArticle = (articleId) => securedAxiosInstance.delete(`${REST_API_ART}/delete/${articleId}`);