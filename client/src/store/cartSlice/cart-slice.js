import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartDevices:[]
    },
    reducers: {
        setCart: (state, action) => {
            state.cartDevices = action.payload;
        },
        addToCart:(state, action)=>{
            const newItem = action.payload;
            state.cartDevices.push(newItem);

        },
        removeFromCart:(state, action)=>{
            const id = action.payload;
            state.cartDevices = state.cartDevices.filter(device => device.id !== id);
        }
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice;
