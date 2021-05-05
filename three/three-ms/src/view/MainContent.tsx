import React from "react";
import { AppContent } from "./AppContent";
import style from "./MainContent.module.css";
import { Toolbar } from "./Toolbar";

export const MainContent = () => {
    return <main className={style.MainContent}>
        <AppContent />
        <Toolbar />
    </main>;
}