import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        types: [],
        brands: [],
        devices: [],
        selectedTypes: [],
        selectedBrands: [],
        page: 1,
        count: 0,
        limit: 9

    },
    reducers: {
        setTypes: (state, action) => {
            state.types = action.payload;
        },
        setBrands: (state, action) => {
            state.brands = action.payload;
        },
        setDevices: (state, action) => {
            state.devices = action.payload;
        },
        setSelectedTypes: (state, action) => {
            state.selectedTypes.push(action.payload);
        },
        setSelectedBrands: (state, action) => {
            state.selectedBrands.push(action.payload);
        },
        removeSelectedType: (state, action) => {
            const id = action.payload;
            state.selectedTypes = state.selectedTypes.filter(type => type.id !== id);
        },
        removeSelectedBrands: (state, action) => {
            const id = action.payload;
            state.selectedBrands = state.selectedBrands.filter(brand => brand.id !== id);
        },
        nextPage: (state) => {
            state.page = state.page + 1;
        },
        prevPage: (state) => {
            state.page--;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        }
    }
});
export const productActions = productSlice.actions;
export default productSlice;