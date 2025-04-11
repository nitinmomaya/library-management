import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {toast} from "react-toastify"

let accessToken : string ='';

export const setAccessToken = (token: string) =>{
    accessToken = token;
}

const API: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        "Content-Type":"application/json"
    },
    // withCredentials: true
});

API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (accessToken && config.headers){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        console.log("using interceptor")
        return config;
    },
    (error) => {
        console.log("comin ghere")
    return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response: AxiosResponse) => {
    return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && (error.response.status === 401 || error.response.status === 403 ) 
            && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                //Dont remove below code - JWT works
                // const refreshResponse = await axios.post('http://localhost:3000/refresh',{},
                //     {withCredentials: true}
                // );
                accessToken = 'dummyToken';
                setAccessToken(accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (refreshError){
                toast.error(`Token refresh failed`)
                console.error(`Token refresh failed`);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;
