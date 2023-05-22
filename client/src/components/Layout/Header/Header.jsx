import React from 'react';
import classes from './Header.module.scss';
import Navbar from "../Navbar/Navbar.jsx";
import {Link} from "react-router-dom";
import {HOME_ROUTE, PRODUCTS_ROUTE} from "../../../util/constants/router-paths.js";
const Header = () => {
    return (
        <header className={classes.header}>
            <h3><Link to={HOME_ROUTE}>TechnoStore</Link></h3>
            <Navbar/>
        </header>
    );
};

export default Header;