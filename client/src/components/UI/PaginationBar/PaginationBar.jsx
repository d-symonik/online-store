import React, {useState} from 'react';
import classes from './PaginationBar.module.scss';
import Button from "../Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../../store/productSlice/product-slice.js";

const PaginationBar = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const pageCount = Math.ceil(products.count / products.limit);


    const goToNextPage = () => {
        if (products.page === pageCount) {
            return;
        }

        dispatch(productActions.nextPage())
    }
    const goToPrevPage = () => {
        if (products.page === 1) {
            return;
        }
        dispatch(productActions.prevPage())
    }
    return (
        <div className={classes.pagination}>
            <Button onClick={goToPrevPage}>Prev</Button>
            <Button onClick={goToNextPage}>Next</Button>
        </div>
    );
};

export default PaginationBar;