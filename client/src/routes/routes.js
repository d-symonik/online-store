import Products from "../pages/Products.jsx";
import Device from "../pages/Device.jsx";
import Auth from "../pages/Auth.jsx";
import Cart from "../pages/Cart.jsx";
import Admin from "../pages/Admin.jsx";
import {
    ADMIN_ROUTE,
    CART_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    PRODUCTS_ROUTE, ABOUT_US_ROUTE, PAYMENT_ROUTE, SUBMIT_ROUTE, HOME_ROUTE
} from "../util/constants/router-paths.js";
import AboutUs from "../pages/AboutUs.jsx";
import Payment from "../pages/Payment.jsx";
import Submit from "../pages/Submit.jsx";
import Home from "../pages/Home.jsx";

export const authorizedRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: SUBMIT_ROUTE,
        Component: Submit
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: PRODUCTS_ROUTE,
        Component: Products
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: `${DEVICE_ROUTE}/:id`,
        Component: Device
    },
    {
        path: ABOUT_US_ROUTE,
        Component: AboutUs
    },
    {
        path: PAYMENT_ROUTE,
        Component: Payment
    },
]