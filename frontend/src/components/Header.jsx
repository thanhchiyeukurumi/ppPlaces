import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    const { user, logout } = useContext(AuthContext);

    return (
        <header>
            <Link className="site-logo" to="/">
                testsomething
            </Link>
            <nav>
                <NavLink
                    to="/places"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Places
                </NavLink>
                {!user && (
                    <NavLink
                        to="/login"
                        style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                        Login
                    </NavLink>
                )}
                {!user && (
                    <NavLink
                        to="/register"
                        style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                        Register
                    </NavLink>
                )}
                {user && (
                    <button className="logout-link" onClick={logout}>
                        Log Out
                    </button>
                )}
            </nav>
        </header>
    );
}