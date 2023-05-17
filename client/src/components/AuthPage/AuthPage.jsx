import React, {useState} from 'react';

import classes from './AuthPage.module.scss';

import Card from "../UI/Card/Card.jsx";
import Input from "../UI/Input/Input.jsx";
import Button from "../UI/Button/Button.jsx";

import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {LOGIN_ROUTE, PRODUCTS_ROUTE, REGISTRATION_ROUTE} from "../../util/constants/router-paths.js";
import {loginUser, registrationUser} from "../../api/user.js";

import {useDispatch} from "react-redux";
import {userActions} from "../../store/userSlice/user-slice.js";

const AuthPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoginPage = location.pathname === LOGIN_ROUTE;
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [error, setError] = useState(null);
    const inputEmailHandler = (event) => {
        setEnteredEmail(event.target.value);
    }
    const inputPasswordHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const signIn = async () => {
        try {
            const user = await loginUser(enteredEmail, enteredPassword);
            dispatch(userActions.setIsAuth(true))
            dispatch(userActions.setUser(user))
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }
    const signUp = async () => {
        try {
            const user = await registrationUser(enteredEmail, enteredPassword);
            dispatch(userActions.setIsAuth(true))
            dispatch(userActions.setUser(user))
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }
    const validateUser = () => {
        const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegexp.test(enteredEmail)) {
            setError({email: 'Input correct email \n(test@gmail.com for example)'})
            throw new Error('Email')
        }
        if (enteredPassword.length < 8) {
            setError({password: 'Password must be at least 8 characters long'});
            throw new Error('Password');
        }
        const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegexp.test(enteredPassword)) {
            setError({password: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'});
            throw new Error('Password');
        }

    }
    const signInHandler = (event) => {
        try {
            event.preventDefault();
            validateUser()
            signIn();
            navigate(PRODUCTS_ROUTE);
            setEnteredEmail('');
            setEnteredPassword('');
            setError(null);
        } catch (e) {
            console.log(e.message)
        }
    }
    const signUpHandler = (event) => {
        try {
            event.preventDefault();
            setEnteredEmail('');
            setEnteredPassword('');
            signUp();

            navigate(PRODUCTS_ROUTE);
            setEnteredEmail('');
            setEnteredPassword('');
            setError(null);

        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <section className={classes.auth}>
            {isLoginPage ? <Card>
                    <h2>Login</h2>
                    <form onSubmit={signInHandler}>
                        <Input type="email" label='Email' placeholder='Enter the email' value={enteredEmail}
                               onChange={inputEmailHandler}/>
                        {error?.email && <p className={classes.error}>{error.email}</p>}
                        <Input type="password" label='Password' placeholder='Enter the password' value={enteredPassword}
                               onChange={inputPasswordHandler}/>
                        {error?.password && <p className={classes.error}>{error.password}</p>}
                        <div className={classes.actions}>
                            <Button>Sign In</Button>
                        </div>

                    </form>
                    <div className={classes.redirect}>
                        <p>Have not account?</p>
                        <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                    </div>
                </Card>
                :
                <Card>
                    <h2>Registration</h2>
                    <form onSubmit={signUpHandler}>
                        <Input type="email" label='Email' placeholder='Enter the email' value={enteredEmail}
                               onChange={inputEmailHandler}/>
                        {error?.email && <p className={classes.error}>{error.email}</p>}
                        <Input type="password" label='Password' placeholder='Enter the password' value={enteredPassword}
                               onChange={inputPasswordHandler}/>
                        {error?.password && <p className={classes.error}>{error.password}</p>}

                        <div className={classes.actions}>
                            <Button>Sign Up</Button>
                        </div>
                    </form>
                    <div className={classes.redirect}>
                        <p>Already have account?</p>
                        <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                    </div>
                </Card>
            }
        </section>
    );
};

export default AuthPage;