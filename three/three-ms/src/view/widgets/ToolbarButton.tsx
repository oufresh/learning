import React from "react";
import styles from "./Toolbar.module.css";

export const ToolbarButton = ({ children, onClick }: {children: any, onClick: ()=> void }) => {
    return <button className={styles.Toolbar}>{children}</button>
}