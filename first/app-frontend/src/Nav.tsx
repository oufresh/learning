import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function createIsActive(link: string) {
    return (match: any, location: { pathname: string }) => {
        if (!match) {
            return false;
        } else
            return location.pathname.indexOf(link) >= 0;
    }
}

function isHome(match: any, location: { pathname: string }) {
    if (!match) {
        return false;
    } else return location.pathname === "/";
}

export const Nav: React.FC = () => {
    return <nav>
        <ul>
            <li>
                <NavLink activeClassName={"App-nav-link-selected"} isActive={isHome} to="/" > Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName={"App-nav-link-selected"} isActive={createIsActive("catalog")} to="/catalog">Catalog</NavLink>
            </li>
        </ul>
    </nav>
}