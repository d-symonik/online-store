import {createSlice} from "@reduxjs/toolkit";
import {NotificationColor} from "../../util/constants/notificationColor.js";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isOpenNotification:false,
        notificationMessage:'',
        color:NotificationColor.Green,
    },
    reducers: {
       setIsOpen:(state, action)=>{
           state.isOpenNotification = action.payload;
       },
        setMessage:(state,action)=>{
            state.notificationMessage = action.payload;
        },
        setColor:(state,action)=>{
            state.color = action.payload;
        }
    }
});
export const uiActions = uiSlice.actions;
export default uiSlice;
