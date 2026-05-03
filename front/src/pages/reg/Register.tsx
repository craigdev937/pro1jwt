import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAPI } from "../../global/UserAPI";
import { ACT } from "../../global/AuthSlice";
import { RSchema } from "../../validation/Schema";
import { UAS, UAD } from "../../global/Hooks";
import type { RType } from "../../validation/Schema";
import { Spinner } from "../../components/spin/Spinner";

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = UAD();
    const isAuth = UAS((state) => state.auth.isAuth);
    const [regUser, { error, isLoading }] = UserAPI.useRegMutation();

    if (error) {
        if ("status" in error) {
            const errMSG = "error" in error ?
                error.error :
                JSON.stringify(error.data);
            return <h1>Error: {errMSG}</h1>
        } else {
            return <h1>Error: {error.message}</h1>
        }
    };

    React.useEffect(() => {
        if (isAuth) navigate("/profile");
    }, [isAuth, navigate]);

    const { register, handleSubmit, watch, 
        formState: { errors } } = useForm<RType>({
            resolver: zodResolver(RSchema) 
        });

    const imageVal = watch("image");

    const onSubmit = async (data: RType) => {
        const res = await regUser(data).unwrap();
        dispatch(ACT.setCred({
            user: res.user, 
            token: res.token, 
            isAuth: true 
        }));
        navigate("/profile");
    };

    return (
        <main className="auth-page">
            <section 
                className="auth-deco" 
                aria-hidden
            />

            <section className="auth-card auth-card--wide fade-up card"
            >
                <aside className="auth-card__head">
                    <div className="auth-card__tag mono">// auth.register()</div>
                    <h1 className="auth-card__title">Create Account</h1>
                    <p className="auth-card__sub">John the HDQ Team</p>
                </aside>

                <form 
                    noValidate
                    className="auth-form auth-form--grid"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <aside className="form-group">
                        <label 
                            htmlFor="first" 
                            className="form-label"
                        >
                            First Name
                        </label>
                        <input 
                            id="first" 
                            placeholder="First Name"
                            className={`form-input${errors.first ? "error" : ""}`}
                            {...register("first")}
                        />
                        {errors.first && 
                            <span className="form-error">
                                {errors.first?.message}
                            </span>} 
                    </aside>

                    <aside className="form-group">
                        <label 
                            htmlFor="last" 
                            className="form-label"
                        >
                            Last Name
                        </label>
                        <input 
                            id="last" 
                            placeholder="Last Name"
                            className={`form-input${errors.first ? "error" : ""}`}
                            {...register("last")}
                        />
                        {errors.last && 
                            <span className="form-error">
                                {errors.last?.message}
                            </span>} 
                    </aside>

                    <aside className="form-group">
                        <label 
                            htmlFor="email" 
                            className="form-label"
                        >
                            Email
                        </label>
                        <input 
                            id="email" 
                            placeholder="Email"
                            className={`form-input${errors.email ? "error" : ""}`}
                            {...register("email")}
                        />
                        {errors.last && 
                            <span className="form-error">
                                {errors.email?.message}
                            </span>} 
                    </aside>

                    <aside className="form-group">
                        <label 
                            htmlFor="password" 
                            className="form-label"
                        >
                            Password
                        </label>
                        <input 
                            id="password" 
                            placeholder="Password...minimum of six characters"
                            className={`form-input${errors.password ? "error" : ""}`}
                            {...register("password")}
                        />
                        {errors.last && 
                            <span className="form-error">
                                {errors.password?.message}
                            </span>} 
                    </aside>

                    <aside className="form-group">
                        <label 
                            htmlFor="image" 
                            className="form-label"
                        >
                            Profile Image URL
                        </label>
                        <input 
                            id="image" 
                            placeholder="Profile Image"
                            className={`form-input${errors.image ? "error" : ""}`}
                            {...register("image")}
                        />
                        {errors.last && 
                            <span className="form-error">
                                {errors.image?.message}
                            </span>} 
                    </aside>
                </form>
            </section>
        </main>
    );
};


