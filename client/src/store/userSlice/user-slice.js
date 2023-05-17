import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth:false,
        userData:{}
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setIsAuth:(state,action)=>{
            state.isAuth = action.payload;
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice;
