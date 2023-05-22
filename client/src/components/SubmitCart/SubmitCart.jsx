import React, {useState} from 'react';
import classes from './SubmitCart.module.scss';
import Card from "../UI/Card/Card.jsx";
import Input from "../UI/Input/Input.jsx";
import Button from "../UI/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../../util/constants/router-paths.js";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cartSlice/cart-slice.js";
import {clearTheCart} from "../../api/cart.js";

const SubmitCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [enteredFirstName,setEnteredFirstName]=useState('');
    const [enteredLastName,setEnteredLastName]=useState('');
    const [enteredAddress,setEnteredAddress]=useState('');
    const [enteredPhone,setEnteredPhone]=useState('');
    const firstNameInputHandler = (event)=>{
        setEnteredFirstName(event.target.value);
    }
    const lastNameInputHandler = (event)=>{
        setEnteredLastName(event.target.value);
    }
    const addressInputHandler = (event)=>{
        setEnteredAddress(event.target.value);
    }
    const phoneInputHandler = (event)=>{
        setEnteredPhone(event.target.value);
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        const formData = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            address:enteredAddress,
            phone: enteredPhone,
        }
        console.log(formData);
        clearTheCart().then(()=>{
            dispatch(cartActions.setCart([]));
            navigate(PRODUCTS_ROUTE);
            alert('Thank you for buying!');
        }).catch((err)=>{
            console.log(err.message);
        })

    }
    return (
        <section className={classes.submit}>
            <Card>
                <h1>Confirm Cart</h1>
                <form onSubmit={submitHandler}>
                    <Input label={'First Name'} value={enteredFirstName} onChange={firstNameInputHandler} />
                    <Input label={'Last Name'} value={enteredLastName} onChange={lastNameInputHandler}/>
                    <Input label={'Address'} value={enteredAddress} onChange={addressInputHandler}/>
                    <Input label={'Phone'} value={enteredPhone} onChange={phoneInputHandler}/>
                    <div className={classes.actions}>
                        <Button>Submit</Button>
                    </div>
                </form>
            </Card>
        </section>
    );
};

export default SubmitCart;