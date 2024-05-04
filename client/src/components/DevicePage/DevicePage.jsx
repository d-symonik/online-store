import React, {useEffect, useState} from 'react';
import classes from './DevicePage.module.scss';
import Card from "../UI/Card/Card.jsx";
import Button from "../UI/Button/Button.jsx";
import {useParams} from "react-router-dom";
import {getDevices, getOneDevice} from "../../api/products.js";
import Image from "../../assets/cart.png";
import Spinner from "../UI/Spinner/Spinner.jsx";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    useEffect(() => {
        getOneDevice(params.id).then((data) => setDevice(data)).finally(() => setIsLoading(false));
    }, [])
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <section className={classes.device}>
            <Card>
                <div className={classes.image}>
                    <img src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}${device.image}` ?? Image}
                         alt={device.name}/>
                </div>
                <div className={classes.info}>
                    <h1>{device.name}</h1>
                    <div className={classes.table}>
                        <table>
                            <tbody>
                            {device.info.map(info => <tr key={info.id}>
                                <td>{info.title}</td>
                                <td>{info.description}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.actions}>
                        <p>{device.price}$</p>

                        <Button>Buy</Button>
                    </div>
                </div>
            </Card>
        </section>);
};

export default DevicePage;