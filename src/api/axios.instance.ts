import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.API,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': process.env.API
    },
})