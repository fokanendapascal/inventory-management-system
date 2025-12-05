import securedAxiosInstance from "./AxiosInstance";

const REST_API_MVTSTOCK = '/mvtstocks';

export const getStockReelArticle = (articleId) => securedAxiosInstance.get(`${REST_API_MVTSTOCK}/${articleId}`);

export const listMvtStocks = (articleId) => securedAxiosInstance.get(`${REST_API_MVTSTOCK}/filter/article/${articleId}`);

export const createEntreeStock = (mvtStock) => securedAxiosInstance.post(`${REST_API_MVTSTOCK}/entree`, mvtStock);

export const createSortieStock = (mvtStock) => securedAxiosInstance.post(`${REST_API_MVTSTOCK}/sortie`, mvtStock);

export const createCorrectionStockPos = (mvtStock) => securedAxiosInstance.post(`${REST_API_MVTSTOCK}/correctionpos`, mvtStock);

export const createCorrectionStockNeg = (mvtStock) => securedAxiosInstance.post(`${REST_API_MVTSTOCK}/correctionneg`, mvtStock);