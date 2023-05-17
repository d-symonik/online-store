import React, {useEffect} from 'react';
import classes from './FilterTab.module.scss';
import Input from "../../UI/Input/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {productActions} from "../../../store/productSlice/product-slice.js";
import {getBrands, getTypes} from "../../../api/products.js";

const FilterTab = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        getTypes().then(data => dispatch(productActions.setTypes(data)))
        getBrands().then(data => dispatch(productActions.setBrands(data)))
        // getDevices().then(data => dispatch(productActions.setBrands(data)))
    },[]);

    const typeCheckboxHandler = (type, event) => {
        if (event.target.checked) {
            dispatch(productActions.setSelectedTypes(type));
        } else {
            dispatch(productActions.removeSelectedType(type.id));
        }
    }
    const brandCheckboxHandler = (brand, event) => {
        if (event.target.checked) {
            dispatch(productActions.setSelectedBrands(brand));
        } else {
            dispatch(productActions.removeSelectedBrands(brand.id));
        }
    }
    return (
        <div className={classes['filter-tab']}>
            <div className={classes.types}>
                <h2>Types</h2>
                <ul>
                    {products.types.map(type =>
                        <li key={type.id}>
                            <input
                                type='checkbox'
                                onChange={typeCheckboxHandler.bind(this, type)}
                            />
                            {type.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className={classes.brands}>
                <h2>Brands</h2>
                <ul>
                    {products.brands.map(brand =>
                        <li key={brand.id}>
                            <input
                                type='checkbox'
                                onChange={brandCheckboxHandler.bind(this, brand)}
                            />
                            {brand.name}
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default FilterTab;