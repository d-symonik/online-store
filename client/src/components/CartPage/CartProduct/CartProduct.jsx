import React from 'react';
import Card from "../../UI/Card/Card.jsx";
import classes from './CartProduct.module.scss';
import Image from '../../../assets/iphone.png';
import Button from "../../UI/Button/Button.jsx";
import {useDispatch} from "react-redux";
import {cartActions} from "../../../store/cartSlice/cart-slice.js";
import {removeFromCart} from "../../../api/cart.js";
import {uiActions} from "../../../store/uiSlice/ui-slice.js";
import {NotificationColor} from "../../../util/constants/notificationColor.js";

const CartProduct = ({device}) => {
    const deviceInfo = device.device;
    const dispatch = useDispatch();
    console.log(device)
    const removeItemFromCart = () => {
        dispatch(cartActions.removeFromCart(device.id));
        removeFromCart(device.id).then(()=>{
            dispatch(uiActions.setIsOpen(true));
            dispatch(uiActions.setMessage('Removed from the cart'));
            dispatch(uiActions.setColor(NotificationColor.Red));
            setTimeout(()=>{
                dispatch(uiActions.setIsOpen(false))
                dispatch(uiActions.setColor(NotificationColor.Green));

            },2000)
        }).catch((err)=>alert(err.message))
    };
    return (

        <Card className={classes.product}>
            <div className={classes.img}>
                <img src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}${deviceInfo.image}`} alt={deviceInfo.name}/>
            </div>
            <div className={classes.body}>
                <div className={classes.text}>
                    <p>{deviceInfo.name}</p>
                    <p>{deviceInfo.price}$</p>
                </div>
                <div className={classes.actions}>
                    <Button onClick={removeItemFromCart}>Remove</Button>
                </div>
            </div>

        </Card>
    );
};

export default CartProduct;