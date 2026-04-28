import React from "react";
import "./Home.css";
import { UserAPI } from "../../global/UserAPI";
import { Spinner } from "../../components/spin/Spinner";

export const Home = () => {
    const { error, isLoading, 
        data } = UserAPI.useAllQuery();
    const US = data?.data;
    console.log(US);

    return (
        <React.Fragment>
            <main>
                <h1>Home Page</h1>
                <Spinner />
            </main>
        </React.Fragment>
    );
};


