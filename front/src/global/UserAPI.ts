import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IData } from "../models/Interfaces";
const URL = "http://localhost:9000/api";

export const UserAPI = createApi({
    reducerPath: "UserAPI",
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
    endpoints: (builder) => ({
        all: builder.query<IData, void>({
            query: () => ({
                url: "/users",
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
    })
});




