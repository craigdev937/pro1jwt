import React from "react";
import { createBrowserRouter, 
    redirect, RouterProvider } from "react-router";
import { NotFound } from "../components/NotFound";
import { Navbar } from "./Navbar";
import { Home } from "../pages/home/Home";
import { Register } from "../pages/reg/Register";
import { Login } from "../pages/log/Login";
import { Profile } from "../pages/profile/Profile";
import { UpProfile } from "../pages/up/UpProfile";

function authLoader() {
    const token = localStorage.getItem("hdq_token");
    if (!token) return redirect("/login");
    return null;
};

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home />},
            { path: "/register", element: <Register />},
            { path: "/login", element: <Login />},
            {
                path: "/profile",
                element: <Profile />,
                loader: authLoader
            },
            {
                path: "/up",
                element: <UpProfile />,
                loader: authLoader
            }
        ]
    }
]);

export const NavRoutes = () => {
    return (
        <React.Fragment>
            <RouterProvider router={RouteList} />
        </React.Fragment>
    );
};



