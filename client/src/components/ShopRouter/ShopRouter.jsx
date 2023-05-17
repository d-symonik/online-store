import React from 'react';
import {Route, Routes} from "react-router-dom";
import {authorizedRoutes, publicRoutes} from "../../routes/routes.js";
import NotFound from "../../pages/NotFound.jsx";

const ShopRouter = () => {
    const isAuth = true;
    return (
        <Routes>
            {isAuth && authorizedRoutes.map(item => <Route key={item.path} path={item.path} Component={item.Component}/>)}
            {publicRoutes.map(item => <Route key={item.path} path={item.path} Component={item.Component}/>)}
            <Route path='*' Component={NotFound}/>
        </Routes>
    );
}
export default ShopRouter;