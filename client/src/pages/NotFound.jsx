import React from 'react';
import {useNavigate} from "react-router-dom";
import Card from "../components/UI/Card/Card.jsx";
import {PRODUCTS_ROUTE} from "../util/constants/router-paths.js";
import Button from "../components/UI/Button/Button.jsx";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage.jsx";

const NotFound = () => {
    return (
        <NotFoundPage/>
    );
};

export default NotFound;