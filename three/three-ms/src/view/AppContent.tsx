import React, { /*useState, useEffect, useRef */ } from "react";
import style from "./AppContent.module.css";
import { useLoad, LoadEnum } from "../hooks/load";
/*
function creaCodiceHtml() {
  return { __html: "<three-ms-app />" };
}*/

const AppContent = () => {
  //const [loaded, setLoaded] = useState<LoadEnum |null>(null);
  const load = useLoad();
  //const scriptTag = useRef<HTMLScriptElement | null>(null); //fix current null readonly
  //useEffect(() => {
    /*function loaded() {
      setLoaded(LoadEnum.SUCCESS);
      console.log("script loaded");
    }
    async function load() {
      try {
        setLoaded(LoadEnum.LOADING);
        const manifest = await (
          await fetch("/three-ms-app/manifest.json")
        ).json();
        console.log(manifest);

        const s = document.getElementById(manifest["name"]);
        if (s != null) throw new Error("script already loaded");

        //load component
        scriptTag.current = document.createElement("script");
        scriptTag.current.id = manifest["name"];
        scriptTag.current.src = `/${manifest["name"]}/${manifest["main.js"]}`;
        scriptTag.current.async = true;
        scriptTag.current.addEventListener("load", loaded);
        document.body.appendChild(scriptTag.current);
      } catch (e) {
        console.error(e);
        setLoaded(LoadEnum.ERROR);
      }
    }
    load();

    return function dispose() {
      scriptTag.current?.removeEventListener("load", loaded);
      scriptTag.current?.parentNode?.removeChild(scriptTag.current);
      console.log("dispose");
    };*/
  //}, []);
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

//
//divdangerouslySetInnerHTML={creaCodiceHtml()
export default React.memo(AppContent);
