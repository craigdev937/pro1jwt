import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IData, IUser, IAuth } from "../models/Interfaces";
import type { RType } from "../validation/Schema";
import type { RootState } from "./RED";
const URL = "http://localhost:9000/api";

export const UserAPI = createApi({
    reducerPath: "UserAPI",
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState)
                .auth.token;
            if (token) headers.set(
                "Authorization", 
                `Bearer ${token}`
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        all: builder.query<IData, void>({
            query: () => ({
                url: "/users",
                method: "GET"
            }),
            providesTags: (result) => result ? [
                ...result.data.map(({ id }) => 
                ({ type: "Users" as const, id })),
                { type: "Users", id: "LIST" },
            ] : [{ type: "Users", id: "LIST" }]
        }),
        one: builder.query<IUser, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        reg: builder.mutation<IAuth, RType>({
            query: (payload) => ({
                url: `/users/register`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Users"]
        }),
    })
});




