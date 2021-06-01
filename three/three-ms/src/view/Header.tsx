import React from "react";
import style from "./Header.module.css"
import cx from "classnames";

export const Header = () => {
    return <header className={cx("header",style.AppHeader)}>
    </header>;
}