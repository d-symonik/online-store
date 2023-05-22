import React, {useEffect, useState} from 'react';
import classes from './DevicePage.module.scss';
import Card from "../UI/Card/Card.jsx";
import Button from "../UI/Button/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getDevices, getOneDevice} from "../../api/products.js";
import Image from "../../assets/cart.png";
import Spinner from "../UI/Spinner/Spinner.jsx";
import {CART_ROUTE, LOGIN_ROUTE} from "../../util/constants/router-paths.js";
import {addToCart} from "../../api/cart.js";
import {uiActions} from "../../store/uiSlice/ui-slice.js";
import {useDispatch, useSelector} from "react-redux";

const DevicePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [device, setDevice] = useState({info: []});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    useEffect(() => {
        getOneDevice(params.id).then((data) => setDevice(data)).finally(() => setIsLoading(false));
    }, [])
    if (isLoading) {
        return <Spinner/>
    }
    const goToCartHandler = ()=>{
        addToCart(device.id).then((data) => {

            dispatch(uiActions.setIsOpen(true));
            dispatch(uiActions.setMessage('Added to the cart'));
            navigate(CART_ROUTE);
            setTimeout(()=>{
                dispatch(uiActions.setIsOpen(false))
            },2000)
        }).catch((err) => alert(err.message));
    }
    return (
        <section className={classes.device}>
            <Card>
                <div className={classes.image}>
                    <img src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}${device.image}` ?? Image}
                         alt={device.name}/>
                </div>
                <div className={classes.info}>
                    <h1>{device.name}</h1>
                    <div className={classes.table}>
                        <table>
                            <tbody>
                            {device.info.map(info => <tr key={info.id}>
                                <td>{info.title}</td>
                                <td>{info.description}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.actions}>
                        <p>{device.price}$</p>

                        {user.isAuth ? <Button onClick={goToCartHandler}>Buy</Button> : <Button onClick={()=>navigate(LOGIN_ROUTE)}>Login to Buy</Button>}
                    </div>
                </div>
            </Card>
        </section>);
};

export default DevicePage;