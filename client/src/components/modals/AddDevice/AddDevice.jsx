import React, {useState} from 'react';
import Modal from "../../UI/Modal/Modal.jsx";
import Button from "../../UI/Button/Button.jsx";

import classes from './AddDevice.module.scss';
import {useSelector} from "react-redux";
import Input from "../../UI/Input/Input.jsx";
import {createDevice} from "../../../api/products.js";

const AddDevice = ({onClose}) => {

    const [error, setError] = useState(null);

    const [selectedType, setSelectedType] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState(1);
    const [enteredName, setEnteredName] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');
    const [enteredImage, setEnteredImage] = useState(null);

    const [deviceInfo, setDeviceInfo] = useState([]);

    const products = useSelector(state => state.products);

    const addInfo = () => {
        setDeviceInfo(prevState => [...prevState, {id: Date.now(), title: '', description: ''}])
    }
    const removeInfo = (id) => {
        setDeviceInfo(prevState => prevState.filter(info => info.id !== id));
        if (deviceInfo.length === 1) {
            setDeviceInfo(prevState => prevState.filter(info => info.id !== id));
            setError(prevState => ({...prevState, deviceInfo: null}));
        }
    }
    const changeInfo = (key, value, id) => {
        setDeviceInfo(prevState => prevState.map(item => item.id === id ? {...item, [key]: value} : item))
    }
    const selectTypeHandler = (event) => {
        setSelectedType(event.target.value);
    };

    const selectBrandHandler = (event) => {
        setSelectedBrand(event.target.value);
    };
    const inputNameHandler = (event) => {
        setEnteredName(event.target.value);
    }
    const inputPriceHandler = (event) => {
        setEnteredPrice(event.target.value);
    }
    const inputImageHandler = (event) => {

        setEnteredImage(event.target.files[0]);

    }
    const validateDeviceForm = () => {


        if (typeof enteredName !== 'string' || enteredName.charAt(0) !== enteredName.toUpperCase().charAt(0) || enteredName.length < 2) {
            setError({name: 'Input correct name. (The name must begin with a capital letter and contain at least 2 letters)'});
            throw new Error('Name');
        }
        if (isNaN(+enteredPrice) || +enteredPrice < 0 || !enteredPrice) {
            setError({price: 'Input correct price. (The price must be a number and greater than 0$)'})
            throw new Error('Price');

        }
        if (!enteredImage) {
            setError({image: 'Select the picture'});
            throw new Error('Image');

        }
        if (enteredImage) {
            const extension = enteredImage.name.split('.');
            if (extension[extension.length - 1] !== 'jpeg' && extension[extension.length - 1] !== 'png' && extension[extension.length - 1] !== 'jpg') {
                setError({image: 'Image format must be .jpg, .jpeg or .png'});
                throw new Error('Image');
            }
        }
        console.log(selectedType)

        if (selectedType <= 0) {
            setError({type: 'Empty type. Choose the type'})
            throw new Error('Type');
        }
        if (selectedBrand <= 0) {
            setError({brand: 'Empty brand. Choose the brand'});

            throw new Error('Brand');

        }
        if (deviceInfo.length === 0) {
            setError({deviceInfo: 'Add an info about device'});
            throw new Error('Info');

        }

        deviceInfo.map(item => {
            if (
                typeof item.title !== 'string' ||
                item.title.charAt(0) !== item.title.toUpperCase().charAt(0) ||
                item.title.length < 2
            ) {
                setError({deviceInfo: 'Input correct title. (The title must begin with a capital letter and contain at least 2 letters)'});
                throw new Error('Info');
            }
            if (
                typeof item.description !== 'string' ||
                item.description.charAt(0) !== item.description.toUpperCase().charAt(0) ||
                item.description.length < 2
            ) {
                setError({deviceInfo: 'Input correct description. (The description must begin with a capital letter and contain at least 2 letters)'});
                throw new Error('Info');
            }

        })

    }

    const submitHandler = (event) => {
        try {
            event.preventDefault();
            console.log(enteredImage)
            validateDeviceForm();
            const device = new FormData();

            device.append('name', enteredName)
            device.append('price', `${+enteredPrice}`)
            device.append('image', enteredImage)
            device.append('deviceBrandId', `${selectedBrand}`)
            device.append('deviceTypeId', `${selectedType}`)
            device.append('info', JSON.stringify(deviceInfo))
            console.log(device)
            createDevice(device).then(data=>{
                alert(`Successful created a device ${enteredName}`)
                setSelectedType(1)
                setSelectedBrand(1)
                setEnteredName('')
                setEnteredPrice('')
                setEnteredImage(null);
                setDeviceInfo([]);
                onClose();

            }).catch((e) => {
                alert(e.message)
                setError(e.message);
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Modal headerText={'Add Device'} onClick={onClose}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <Input
                        label={'Name of the device:'}
                        placeholder={'Enter the name'}
                        value={enteredName}
                        onChange={inputNameHandler}
                        accept={'.jpg, .jpeg, .png'}
                    />
                </div>
                {error?.name && <p className={classes.error}>{error.name}</p>}

                <div className={classes.control}>
                    <Input
                        label={'Price of the device:'}
                        placeholder={'Enter the price (in  $)'}
                        type='number'
                        value={enteredPrice}
                        onChange={inputPriceHandler}
                    />
                </div>
                {error?.price && <p className={classes.error}>{error.price}</p>}

                <div className={classes.control}>
                    <Input
                        label={'Image of the device:'}
                        type='file'
                        onChange={inputImageHandler}
                        placeholder={'Select Image'}
                    />
                </div>
                {error?.image && <p className={classes.error}>{error.image}</p>}

                <div className={classes.control}>
                    <label htmlFor="type__select">Choose type of the device</label>
                    <select id="type__select" value={selectedType} onChange={selectTypeHandler}>
                        {products.types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                </div>
                {error?.type && <p className={classes.error}>{error.type}</p>}

                <div className={classes.control}>
                    <label htmlFor="brand__select">Choose brand of the device</label>
                    <select id="brand__select" value={selectedBrand} onChange={selectBrandHandler}>
                        {products.brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                    </select>
                </div>
                {error?.brand && <p className={classes.error}>{error.brand}</p>}

                {deviceInfo.map(info =>
                    <div className={`${classes.control} ${classes.info}`} key={info.id}>
                        <Input placeholder={'Enter the title'} onChange={(e)=>changeInfo('title', e.target.value, info.id)}/>
                        <Input placeholder={'Enter the description'} onChange={(e)=>changeInfo('description', e.target.value, info.id)}/>
                        <Button type="button" onClick={() => removeInfo(info.id)}>Remove</Button>
                    </div>
                )}
                {error?.deviceInfo && <p className={classes.error}>{error.deviceInfo}</p>}
                <div className={classes.control}>
                    <Button type='button' onClick={addInfo}>Add a New Device Property</Button>
                </div>
                <div className={classes.actions}>
                    <Button>Add New Device</Button>
                    <Button onClick={onClose}>Close</Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddDevice;