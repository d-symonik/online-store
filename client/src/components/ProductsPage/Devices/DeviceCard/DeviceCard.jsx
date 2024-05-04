import React, {useEffect, useState} from 'react';
import classes from './DeviceCard.module.scss';
import Image from '../../../../assets/cart.png';
import Button from "../../../UI/Button/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {CART_ROUTE, DEVICE_ROUTE} from "../../../../util/constants/router-paths.js";
import {useDispatch} from "react-redux";
import {cartActions} from "../../../../store/cartSlice/cart-slice.js";
import {addToCart} from "../../../../api/cart.js";
import uiSlice, {uiActions} from "../../../../store/uiSlice/ui-slice.js";

const DeviceCard = ({device}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goToDeviceInfoPage = () => {
        navigate(`${DEVICE_ROUTE}/${device.id}`)
    }
    const addToCartHandler = (e) => {

        e.stopPropagation();

        addToCart(device.id).then((data) => {

            dispatch(uiActions.setIsOpen(true));
            dispatch(uiActions.setMessage('Added to the cart'));

           setTimeout(()=>{
                dispatch(uiActions.setIsOpen(false))
            },2000)
        }).catch((err) => alert(err.message));
    }
    return (
        <div className={classes.device} onClick={goToDeviceInfoPage}>
            <div className={classes.card}>
                <div className={classes.image}>
                    <img src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}${device.image}` ?? Image}
                         alt={device.name}/>
                </div>
                <div className={classes.body}>
                    <h2>{device.name}</h2>
                    <p>{device.price}$</p>
                    <Button onClick={addToCartHandler}>Add to Cart</Button>
                </div>

            </div>
        </div>
    );
};

export default DeviceCard;