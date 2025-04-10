import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

let accessToken : string ='';

export const setAccessToken = (token: string) =>{
    accessToken = token;
}

const API: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // if (accessToken && config.headers){
        //     config.headers['Authorization'] = `Bearer ${accessToken}`;
        // }
        return config;
    },
    (error) => {
    return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response: AxiosResponse) => {
    return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && (error.response.status === 401 || error.response.status === 403) 
            && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const refreshResponse = await axios.post('http://localhost:5000/refresh',{},
                    {withCredentials: true}
                );
                accessToken = refreshResponse.data.accessToken;
                setAccessToken(accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (refreshError){
                console.error(`Token refresh failed`);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;
 