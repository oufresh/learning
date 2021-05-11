import { useState, useEffect, useRef } from "react";

export enum LoadEnum {
    LOADING = "LOADING",
    ERROR = "ERROR",
    SUCCESS = "LOADED"
  };

export const useLoad = () => {
  const scriptTag = useRef<HTMLScriptElement | null>(null); //fix current null readonly
  const [state, setState] = useState<LoadEnum |null>(null);
  useEffect(() => {
    function loaded() {
    setState(LoadEnum.SUCCESS);
    console.log("script loaded");
    };
    async function load() {
      try {
        setState(LoadEnum.LOADING);
        console.log("script loading");
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
        setState(LoadEnum.ERROR);
      }
    }

    load();
    return function dispose() {
        scriptTag.current?.removeEventListener("load", loaded);
        scriptTag.current?.parentNode?.removeChild(scriptTag.current);
        console.log("dispose");
    };

  }, []);

  return state;
};
