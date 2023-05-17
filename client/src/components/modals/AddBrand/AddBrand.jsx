import React, {useState} from 'react';
import Modal from "../../UI/Modal/Modal.jsx";
import classes from "./AddBrand.module.scss";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import {createBrand, createType} from "../../../api/products.js";

const AddBrand = ({onClose}) => {
    const [error, setError] = useState(null);
    const [enteredBrand, setEnteredBrand] = useState('');

    const validateBrand = () => {
        if (
            typeof enteredBrand !== 'string' ||
            enteredBrand.charAt(0) !== enteredBrand.toUpperCase().charAt(0) ||
            enteredBrand.length < 2
        ) {
            throw new Error('Input correct brand. (The brand must begin with a capital letter and contain at least 2 letters)');
        }

    }
    const brandInputHandler = (event) => {
        setEnteredBrand(event.target.value);
    }
    const submitHandler = (event) => {
        try {
            event.preventDefault();
            validateBrand();
            createBrand({name: enteredBrand}).then(() => {
                setEnteredBrand('');
                setError(null);
                onClose();
                alert(`Successful added a brand ${enteredBrand}`);

            }).catch((e) => {
                alert(e.message)
                setError(e.message);
            })

        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <Modal headerText={'Add Brand'}>
            <form className={classes.form} onSubmit={submitHandler}>
                <Input type={'text'} placeholder='Enter a new brand' value={enteredBrand} onChange={brandInputHandler}/>
                {error && <p>{error}</p>}
                <div className={classes.actions}>
                    <Button>Add</Button>
                    <Button onClick={onClose}>Close</Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddBrand;