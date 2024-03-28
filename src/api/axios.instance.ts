import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.API,
    headers: {
        'Access-Control-Allow-Origin': process.env.API
    },
})