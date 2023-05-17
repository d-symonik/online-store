import React, {useEffect} from 'react';
import classes from './ProductsPage.module.scss';
import FilterTab from "./FilterTab/FilterTab.jsx";
import Card from "../UI/Card/Card.jsx";
import Devices from "./Devices/Devices.jsx";
import {useDispatch} from "react-redux";
import {getBrands, getTypes} from "../../api/products.js";
import {productActions} from "../../store/productSlice/product-slice.js";

const ProductsPage = () => {
    const dispatch = useDispatch();


    return (
        <Card className={classes.products}>
            <FilterTab/>
            <Devices/>
        </Card>
    );
};

export default ProductsPage;