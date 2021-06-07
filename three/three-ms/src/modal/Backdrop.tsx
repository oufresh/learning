import React from "react";
import styles from "./Backdrop.module.css";

export const Backdrop = ({ children }: { children: any }) => {
  return <div className={styles.Backdrop}>{children}</div>;
};
