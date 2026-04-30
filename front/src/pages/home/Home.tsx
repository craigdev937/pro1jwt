import React, { use } from "react";
import "./Home.css";
import { Link } from "react-router";
import { UserAPI } from "../../global/UserAPI";
import { Spinner } from "../../components/spin/Spinner";

export const Home = () => {
    const { error, isLoading, 
        data } = UserAPI.useAllQuery();
    const US = data?.data;

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

    return (
        <React.Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <main className="page home">
                    <header className="home__header fade-up">
                        <div className="home__header-tag mono">
                            // users.all()
                        </div>
                        <h1 className="home__title">
                            Registered<br />
                            <span className="home__title--accent">Members</span>
                            <p className="home__subtitle">
                                {data?.count ?? "-"} users in the system
                            </p>
                        </h1>
                    </header>
                    {<section className="home__grid">
                        {US && US.map((user, i) => (
                            <aside 
                                key={user.id}
                                className="user__card fade-up"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="user-card__img-wrap">
                                    <img 
                                        className="user-card__img"
                                        src={user.image} 
                                        alt={`${user.first} ${user.last}`} 
                                    />
                                    <div className="user-card__id mono">
                                        #{user.id}
                                    </div>
                                    <div className="user-card__body">
                                        <h2 className="user-card__name">
                                            {user.first} {user.last}
                                        </h2>
                                        <p className="user-card__email mono">
                                            {user.email}
                                        </p>
                                        <time 
                                            className="user-card__date"
                                            dateTime={user.created_at} 
                                        >
                                            Joined {new Date(user.created_at)
                                                .toLocaleDateString("en-US", {
                                                month: "short", 
                                                day: "numeric", 
                                                year: "numeric"
                                            })}
                                        </time>
                                    </div>
                                </div>
                            </aside>
                        ))}
                    </section>}

                    <section className="home__cta fade-up">
                        <Link 
                            to={"/register"} 
                            className="btn btn--primary"
                        >
                            Register
                        </Link>
                        <Link 
                            to={"/login"} 
                            className="btn btn--secondary"
                        >
                            Login
                        </Link>
                    </section>
                </main>
            )}
        </React.Fragment>
    );
};


