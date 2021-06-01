import React from "react";
import style from "./Loader.module.css";
import cx from "classnames";

export const Loader = ()=>{
   return <div className={style.LoaderContent}><div className={cx("loader", style.Loader)} /></div>;
}