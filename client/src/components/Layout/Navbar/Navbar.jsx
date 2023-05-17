import React, {useState} from 'react';
import classes from './Navbar.module.scss';
import {NavLink} from "react-router-dom";
import {
    ABOUT_US_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    LOGIN_ROUTE, PAYMENT_ROUTE,
    PRODUCTS_ROUTE
} from "../../../util/constants/router-paths.js";
import Button from "../../UI/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {UserRoles} from "../../../util/constants/UserRoles.js";
import {userActions} from "../../../store/userSlice/user-slice.js";

const Navbar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        dispatch(userActions.setUser({}));
        dispatch(userActions.setIsAuth(false));
    }
    return (
        <nav className={classes.navbar}>
            <ul>
                <li>
                    <NavLink to={PRODUCTS_ROUTE}>Products</NavLink>
                </li>
                <li>
                    <NavLink to={ABOUT_US_ROUTE}>About Us</NavLink>
                </li>
                <li>
                    <NavLink to={PAYMENT_ROUTE}>Payment</NavLink>
                </li>
            </ul>
            <ul>
                {user.isAuth ? <>
                        {user.userData.role === UserRoles.ADMIN &&
                            <li>
                                <NavLink to={ADMIN_ROUTE}>
                                    <Button>Admin</Button>
                                </NavLink>
                            </li>
                        }

                        <li>
                            <NavLink to={CART_ROUTE}>
                                <Button>Cart</Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/'>
                                <Button onClick={logoutHandler}>Logout</Button>
                            </NavLink>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <NavLink to={LOGIN_ROUTE}>
                                <Button>
                                    Login
                                </Button>
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
};

export default Navbar;