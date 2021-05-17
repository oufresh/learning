import React, { /*useState, useEffect, useRef */ } from "react";
import style from "./AppContent.module.css";
import { useLoad, LoadEnum } from "../hooks/load";


const AppContent = () => {
  const load = useLoad();
  if (load === LoadEnum.SUCCESS) {
    return (
      <div className={style.AppContent}>
        <div className={style.AppSpace}><three-ms-app /></div>;
      </div>
    );
  } else if (load === LoadEnum.ERROR) {
    return <p>Error loading</p>;
  } else return <div className={style.AppContent}></div>;
};

export default React.memo(AppContent);
