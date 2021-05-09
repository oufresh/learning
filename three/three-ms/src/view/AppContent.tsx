import React, { useState, useEffect } from "react";
import style from "./AppContent.module.css";

function creaCodiceHtml() {
    return {__html: '<three-ms-app />'};
  }
export const AppContent = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      function loaded() {
        setLoaded(true);
        console.log("script loaded");
      }
    async function load() {
      try {
        const manifest = (
          await (await fetch("/three-ms-app/manifest.json")).json());
        console.log(manifest);

        //load component
        const scriptTag = document.createElement("script");
        scriptTag.src = `/${manifest["name"]}/${manifest["main.js"]}`;
        scriptTag.async = true;
        scriptTag.addEventListener("load",loaded);
        document.body.appendChild(scriptTag);
        
      } catch (e) {
        console.error(e);
        setLoaded(false);
      }
    }
    load();
    return function dispose() {
        console.log("dispose");
    }
  }, []);
  return (
    <div className={style.AppContent}>
      {loaded === false ? <p>Error loadng three-ms-app</p> : <div className={style.AppSpace} dangerouslySetInnerHTML={creaCodiceHtml()}/>}
    </div>
  );
};
