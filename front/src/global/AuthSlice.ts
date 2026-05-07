import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, AuthState } from "../models/Interfaces";

const storedUser = localStorage.getItem("hdq_user");

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuth: false
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCred: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user,
            state.isAuth = true,
            localStorage.setItem("hdq_user", 
                JSON.stringify(action.payload.user))
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload,
            localStorage.setItem("hdq_user", 
                JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null,
            state.isAuth = false,
            localStorage.removeItem("hdq_user")
        },
    }
});

export const ACT = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;



