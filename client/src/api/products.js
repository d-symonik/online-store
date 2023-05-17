import {$authHost, $host} from "./index.js";
import jwtDecode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data
};

export const getTypes = async (type) => {
    const {data} = await $host.get('api/type');
    return data
};

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data
};

export const getBrands = async (type) => {
    const {data} = await $host.get('api/brand');
    return data
};
export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device);
    return data
}
export const getDevices = async (typeId, brandId, page, limit = 9) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}
export const getOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`);
    return data
}