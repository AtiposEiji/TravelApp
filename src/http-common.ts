import axios, { AxiosInstance, AxiosError } from "axios";
import { hideSkeletor, showSkeletor } from "./main";

const baseUrl = process.env.NODE_ENV === "production" ? "https://localhost:3000/" : "https://localhost:3000/";

const apiClient: AxiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
        "content-type": "application/json",
    },
    withCredentials: false
});

let pendingRequests = 0;

apiClient.interceptors.request.use((config) => {
    pendingRequests++;
    showSkeletor();
    return config;
}, (error) => {
    hideSkeletor();
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    pendingRequests--;
    if(pendingRequests === 0) {
        hideSkeletor();
    }
    return response;
}, (error: AxiosError) => {
    hideSkeletor();
    return Promise.reject(error);
})

export default apiClient;