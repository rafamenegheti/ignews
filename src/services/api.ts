import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ignews-rafamenegheti.vercel.app/'
})