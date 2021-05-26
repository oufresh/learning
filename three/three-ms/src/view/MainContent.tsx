import React from "react";
import AppContent from "./AppContent";
import style from "./MainContent.module.css";
import { Toolbar } from "./toolbar/Toolbar";
import { Details } from "./details/Details";

export const MainContent = () => {
    return <main className={style.MainContent}>
        <Details />
        <AppContent />
        <Toolbar />
    </main>;
}