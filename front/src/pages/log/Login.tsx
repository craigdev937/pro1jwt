import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAPI } from "../../global/UserAPI";
import { ACT } from "../../global/AuthSlice";
import { UAS, UAD } from "../../global/Hooks";
import { LSchema } from "../../validation/Schema";
import type { LType } from "../../validation/Schema";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = UAD();
    const isAuth = UAS((state) => state.auth.isAuth);
    const [logUser, { isLoading, error }] = UserAPI.useLogMutation();

    React.useEffect(() => {
        if (isAuth) navigate("/profile");
    }, [isAuth, navigate]);

    const { register, handleSubmit, formState: { errors } } = 
        useForm<LType>({ resolver: zodResolver(LSchema) });

    const onSubmit = async (data: LType) => {
        const res = await logUser(data).unwrap();
        dispatch(ACT.setCred({
            user: res.user,
            isAuth: true
        }));
        navigate("/profile");
    };

    return (
        <React.Fragment>
            <main>
                <h1>Login Page</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat officiis doloremque numquam! Culpa minima incidunt aspernatur sint expedita! Molestias magni facilis rerum obcaecati esse labore unde aspernatur natus eligendi est.
                </p>
            </main>
        </React.Fragment>
    );
};


