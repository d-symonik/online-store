import React from 'react';
import Notification from "../../UI/Notification/Notification.jsx";
import {useSelector} from "react-redux";

const CartNotification = ({message}) => {
    const ui = useSelector(state => state.ui);
    return (
        <Notification style={{
            opacity: !ui.isOpenNotification ? "0" : "1",
            transition: "all .5s",
            visibility: !ui.isOpenNotification ? "hidden" : "visible",
            backgroundColor: ui.color,

        }}>
            {ui.notificationMessage}
        </Notification>
    );
};

export default CartNotification;