import React, {useState} from 'react';
import Card from "../UI/Card/Card.jsx";
import classes from './AdminPage.module.scss';
import Button from "../UI/Button/Button.jsx";
import AddType from "../modals/AddType/AddType.jsx";
import AddBrand from "../modals/AddBrand/AddBrand.jsx";
import AddDevice from "../modals/AddDevice/AddDevice.jsx";

const AdminPage = () => {

    const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
    const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);
    const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
    return (
        <section className={classes.admin}>
            <Card>
                <h2>Admin Panel</h2>
                <div className={classes.actions}>
                    <Button onClick={()=>setIsTypeModalVisible(true)}>Add new type</Button>
                    <Button onClick={()=>setIsBrandModalVisible(true)}>Add new brand</Button>
                    <Button onClick={()=>setIsDeviceModalVisible(true)}>Add new device</Button>
                </div>
                {isTypeModalVisible && <AddType onClose={()=>setIsTypeModalVisible(false)}/>}
                {isBrandModalVisible && <AddBrand onClose={()=>setIsBrandModalVisible(false)}/>}
                {isDeviceModalVisible && <AddDevice onClose={()=>setIsDeviceModalVisible(false)}/>}
            </Card>
        </section>
    );

};

export default AdminPage;