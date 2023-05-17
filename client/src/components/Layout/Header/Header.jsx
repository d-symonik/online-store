import React from 'react';
import classes from './Header.module.scss';
import Navbar from "../Navbar/Navbar.jsx";
import {Link} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../../../util/constants/router-paths.js";
const Header = () => {
    return (
        <header className={classes.header}>
            <h3><Link to={PRODUCTS_ROUTE}>Techno Store</Link></h3>
            <Navbar/>
        </header>
    );
};

export default Header;