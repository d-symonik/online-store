import React from 'react';
import Card from "../UI/Card/Card.jsx";
import classes from './HomePage.module.scss';
import Button from "../UI/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../../util/constants/router-paths.js";

const HomePage = () => {
    const navigate = useNavigate();
    const goToTheShop = ()=>{
        navigate(PRODUCTS_ROUTE);
    }
    return (

        <section className={classes.home}>
            <Card>
                <div className={classes.background}>
                    <h1>Welcome to TechnoStore</h1>
                    <Button onClick={goToTheShop}>Let`s go to the shop!</Button>
                </div>

            </Card>
        </section>
    );
};

export default HomePage;