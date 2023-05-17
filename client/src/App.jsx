import classes from './App.module.scss'
import ShopRouter from "./components/ShopRouter/ShopRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Layout/Header/Header.jsx";
import Container from "./components/Layout/Container/Container.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner.jsx";
import {authUser} from "./api/user.js";
import {userActions} from "./store/userSlice/user-slice.js";
import Notification from "./components/UI/Notification/Notification.jsx";
import CartNotification from "./components/CartPage/CartNotification/CartNotification.jsx";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        authUser().then((data) => {

            dispatch(userActions.setUser(data))
            dispatch(userActions.setIsAuth(true));
        }).finally(() => setLoading(false));

    }, [])

    return (
        <BrowserRouter>
            <Header/>
            <Container className={classes.container}>
                {loading && <Spinner/>}
                {!loading && <ShopRouter/>}
            </Container>
            <CartNotification/>
        </BrowserRouter>
    )
}

export default App
