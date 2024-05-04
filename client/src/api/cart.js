import {$authHost, $host} from "./index.js";
import jwtDecode from "jwt-decode";

export const addToCart = async (id) => {
    const {data} = await $authHost.post('api/cart', {deviceId: id});
    return data;
};

export const removeFromCart = async (id) => {
    const {data} = await $authHost.delete(`api/cart/${id}`)
    return data;
};

export const getAllDeviceFromCart = async () => {
    const {data} = await $authHost.get('api/cart');
    return data;
};

