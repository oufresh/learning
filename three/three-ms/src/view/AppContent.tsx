import React from "react";
import style from "./AppContent.module.css";
import { useLoad, LoadEnum } from "../hooks/load";
import { Loader } from "./widgets/Loader";
import { Error } from "./widgets/Error";


const AppContent = () => {
  const load = useLoad();
  if (load === LoadEnum.SUCCESS) {
    console.log("render app");
    return (
      <div className={style.AppContent}>
        <div className={style.AppSpace}><three-ms-app /></div>
      </div>
    );
  } else return <div className={style.AppContent}>
    {load === LoadEnum.ERROR ? <Error message={"Error loading ..."} /> : <Loader />}
  </div>;
};

export default React.memo(AppContent);
