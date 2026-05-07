import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IData, IUser, AuthState } from "../models/Interfaces";
import type { RType, LType } from "../validation/Schema";
const URL = "http://localhost:9000/api";

export const UserAPI = createApi({
    reducerPath: "UserAPI",
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
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
        reg: builder.mutation<AuthState, RType>({
            query: (payload) => ({
                url: `/users/register`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Users"]
        }),
        log: builder.mutation<AuthState, LType>({
            query: (payload) => ({
                url:   `/users/login`,
                method: "POST",
                body: payload
            })
        })
    })
});




