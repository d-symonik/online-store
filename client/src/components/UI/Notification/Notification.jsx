import React from 'react';
import classes from './Notification.module.scss';
const Notification = ({style, children}) => {
    return (
        <div className={classes.notification} style={style}>
            {children}
        </div>
    );
};

export default Notification;