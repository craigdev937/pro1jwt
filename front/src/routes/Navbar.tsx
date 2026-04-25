import React from "react";
import "./Navbar.css";
import { Link, Outlet } from "react-router";

export const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <header className="nav__header">
                <nav className="navbar">
                    <Link
                        to={"/"}
                        className="nav__logo"
                        onClick={closeMenu}
                    >
                        LOGO
                    </Link>

                    {/* NAV MENU BUTTON */}
                    <button 
                        className="nav__button"
                        type="button"
                        aria-label="toggle"
                        aria-expanded={open}
                        onClick={handleClick}
                    >
                        <aside className={`
                            nav__burger ${open ? "open" : ""}
                        `}>
                            <span className="nav__line" />
                            <span className="nav__line" />
                            <span className="nav__line" />
                            <span className="nav__line" />
                            <span className="nav__line" />
                            <span className="nav__line" />
                        </aside>
                    </button>

                    {/* SIDEBAR AND CONTAINER QUERIES */}
                    <menu className={open ? 
                        "nav__menu active" : 
                        "nav__menu"
                    }>
                        <li className="nav__item">
                            <Link
                                to={"/register"}
                                className="nav__links"
                                onClick={closeMenu}
                            >
                                Register
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                to={"/login"}
                                className="nav__links"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                to={"/profile"}
                                className="nav__links"
                                onClick={closeMenu}
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link
                                to={"/up"}
                                className="nav__links"
                                onClick={closeMenu}
                            >
                                Update Profile
                            </Link>
                        </li>
                    </menu>
                </nav>
            </header>
            <Outlet />
        </React.Fragment>
    );
};



