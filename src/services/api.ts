import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ignews-4646p61a0-rafamenegheti.vercel.app/api'
})