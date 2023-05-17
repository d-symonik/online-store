import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./productSlice/product-slice.js";
import userSlice from "./userSlice/user-slice.js";
import cartSlice from "./cartSlice/cart-slice.js";
import uiSlice from "./uiSlice/ui-slice.js";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,

    }
})
export default store;