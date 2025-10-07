import axios from 'axios';
// const BASE_URL = 'http://localhost:3500/api/v1';
const BASE_URL = import.meta.env.VITE_API_URL;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});