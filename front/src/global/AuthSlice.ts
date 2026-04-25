import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, AuthState } from "../models/Interfaces";

const storedUser = localStorage.getItem("hdq_user");
const storedToken = localStorage.getItem("hdq_token");

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ?? null,
    isAuth: false
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCred: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.isAuth = true,
            localStorage.setItem("hdq_user", 
                JSON.stringify(action.payload.user)),
            localStorage.setItem("hdq_token", 
                action.payload.token ?? "")
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload,
            localStorage.setItem("hdq_user", 
                JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null,
            state.token = null,
            state.isAuth = false,
            localStorage.removeItem("hdq_user"),
            localStorage.removeItem("hdq_token")
        },
    }
});

export const ACT = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;



