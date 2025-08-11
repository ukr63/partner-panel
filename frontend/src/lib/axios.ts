// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://acd.solutions/api/proxy',
    timeout: 10000,
});

// Dynamically set the AUTH-TOKEN for each request
axiosInstance.interceptors.request.use((config) => {
    const authToken = JSON.parse(<string>localStorage.getItem('user'))?.token;
    if (authToken) {
        config.headers['AUTH-TOKEN'] = authToken;
    }
    return config;
});

export default axiosInstance;