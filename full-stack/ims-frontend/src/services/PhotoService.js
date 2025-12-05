import securedAxiosInstance from "./AxiosInstance";

const REST_API_PHOTO = '/photos';

export const createPhoto = (id, titre, context, photo) => 
    securedAxiosInstance.post(`${REST_API_PHOTO}/${id}/${titre}/${context}`, photo); 