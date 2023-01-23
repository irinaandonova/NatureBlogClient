import axios from "axios";

const baseUrl = 'https://localhost:7067/api/';

const axiosLocalInstance = axios.create({
    baseURL: baseUrl,
});

export default axiosLocalInstance;