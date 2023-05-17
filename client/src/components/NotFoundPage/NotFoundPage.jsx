import React from 'react';
import Card from "../UI/Card/Card.jsx";
import Button from "../UI/Button/Button.jsx";
import {PRODUCTS_ROUTE} from "../../util/constants/router-paths.js";
import classes from './NotFoundPage.module.scss';
import {useNavigate} from "react-router-dom";
const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <section className={classes.notfound}>
            <Card>
                <h2>Not found page :(</h2>
                <p>Oops... This page does not exist,<br/> but you`re always can buy some devices in out shop</p>
                <Button onClick={() => navigate(PRODUCTS_ROUTE)}>Go to Shop</Button>
            </Card>
        </section>
    );
};

export default NotFoundPage;