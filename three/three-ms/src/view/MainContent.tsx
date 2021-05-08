import React from "react";
import { AppContent } from "./AppContent";
import style from "./MainContent.module.css";
import { Toolbar } from "./Toolbar";
import { NavMenu} from "./NavMenu";

export const MainContent = () => {
    return <main className={style.MainContent}>
        <NavMenu />
        <AppContent />
        <Toolbar />
    </main>;
}