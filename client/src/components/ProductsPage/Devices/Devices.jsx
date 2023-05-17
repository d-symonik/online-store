import React, {useEffect, useState} from 'react';
import classes from './Devices.module.scss';
import DeviceCard from "./DeviceCard/DeviceCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getBrands, getDevices} from "../../../api/products.js";
import {productActions} from "../../../store/productSlice/product-slice.js";
import Spinner from "../../UI/Spinner/Spinner.jsx";
import PaginationBar from "../../UI/PaginationBar/PaginationBar.jsx";
///============== зробити фільтрацію і пагінацію
const Devices = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let params = [null, null, products.page, products.limit];

        if (products.selectedTypes.length !== 0) {
            params[0] = JSON.stringify(products.selectedTypes.map(item => item.id))
        } else {
            params[0] = null;
        }
        if (products.selectedBrands.length !== 0) {
            params[1] = JSON.stringify(products.selectedBrands.map(item => item.id))
        } else {
            params[1] = null;
        }
        getDevices(...params).then(data => {
            dispatch(productActions.setDevices(data.rows));
            dispatch(productActions.setCount(data.count));
        }).finally(() => setIsLoading(false));

    }, [products.selectedTypes, products.selectedBrands, products.page]);

    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.devices}>
                {products.devices.length !== 0 ? products.devices.map(product => <DeviceCard key={product.id}
                                                                                             device={product}/>)
                    : <p>Not found devices by this filter</p>
                }
            </div>
            {products.devices.length !== 0 && <PaginationBar/>}
        </div>
    );
};

export default Devices;