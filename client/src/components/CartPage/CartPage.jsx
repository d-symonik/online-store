import React, {useEffect, useState} from 'react';
import classes from './CartPage.module.scss';
import Card from "../UI/Card/Card.jsx";
import CartProduct from "./CartProduct/CartProduct.jsx";
import {getAllDeviceFromCart} from "../../api/cart.js";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../store/cartSlice/cart-slice.js";
import Spinner from "../UI/Spinner/Spinner.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../UI/Button/Button.jsx";
import {PRODUCTS_ROUTE, SUBMIT_ROUTE} from "../../util/constants/router-paths.js";

const CartPage = () => {
    const cartDevices = useSelector(state => state.cart.cartDevices);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllDeviceFromCart().then(data => {
                const devices = data.map(item => {
                        return {
                            id: item.id,
                            deviceId: item.deviceId,
                            device: item.device
                        }
                    }
                )
                dispatch(cartActions.setCart(devices));
            }
        ).catch(err => alert(err.message)).finally(() => setIsLoading(false));
    }, []);

    const submitCart = ()=>{
        navigate(SUBMIT_ROUTE);
    }
    console.log(cartDevices)
    const totalAmount = cartDevices ? cartDevices.reduce((acc, value) => acc + value.device.price, 0) : null;
    return (
        <section className={classes.cart}>
            <Card className={classes.wrapper}>
                <h1>Cart</h1>
                {isLoading && <Spinner/>}
                {!isLoading && cartDevices.length!==0 &&<>
                    {cartDevices.map(item => <CartProduct key={item.id} device={item}/>)}
                    <p className={classes.total}>Total: ${totalAmount}</p>
                    <div className={classes.actions}>
                        <Button onClick={submitCart}>Confirm</Button>
                    </div>
                </>}
                {
                    !isLoading &&
                    cartDevices.length === 0 &&
                    <div className={classes.empty}>
                        <p>Empty cart. Add new device!</p>
                        <NavLink to={PRODUCTS_ROUTE}><Button>Go to Shop</Button></NavLink>
                    </div>}
            </Card>
        </section>
    );
};

export default CartPage;