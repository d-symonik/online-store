import React, {useState} from 'react';
import Modal from "../../UI/Modal/Modal.jsx";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";

import classes from './AddType.module.scss';
import {createType} from "../../../api/products.js";

const AddType = ({onClose}) => {

    const [error, setError] = useState(null);
    const [enteredType, setEnteredType] = useState('');

    const validateType = () => {
        if (
            typeof enteredType !== 'string' ||
            enteredType.charAt(0) !== enteredType.toUpperCase().charAt(0) ||
            enteredType.length < 2
        ) {
            throw new Error('Input correct type. (The type must begin with a capital letter and contain at least 2 letters)')
        }

    }
    const typeInputHandler = (event) => {
        setEnteredType(event.target.value);
    }
    const submitHandler = (event) => {
        try {
            event.preventDefault();
            validateType();
            createType({name:enteredType}).then(() => {
                setEnteredType('');
                setError(null);
                onClose();
                alert(`Successful added a type ${enteredType}`);

            }).catch((e)=>{
                alert(e.message)
                setError(e.message);
            })

        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <Modal headerText={'Add Type'}>
            <form className={classes.form} onSubmit={submitHandler}>
                <Input type={'text'} placeholder='Enter a new type' value={enteredType} onChange={typeInputHandler}/>
                {error && <p>{error}</p>}
                <div className={classes.actions}>
                    <Button>Add</Button>
                    <Button onClick={onClose}>Close</Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddType;