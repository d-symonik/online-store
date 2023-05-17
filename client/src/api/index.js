import axios from "axios";

const $host = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,

});
const $authHost = axios.create({
    baseURL:import.meta.env.VITE_REACT_APP_SERVER_URL,

});

const authInterceptor = (config)=>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;

}
$authHost.interceptors.request.use(authInterceptor);
export {
    $host,
    $authHost
};