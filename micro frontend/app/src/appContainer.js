import { registerElement } from "./utils";

const STYLE_NAME = "app-container-style";

class AppContainer extends HTMLElement {
  constructor() {
    super();
    if(!document.getElementById(STYLE_NAME)) {
      const style = document.createElement("style");
      style.type = "text/css";
      style.id = STYLE_NAME;
      style.innerHTML = `.appContainer { 
          background-color: #FFF;
          display: block;
          position: absolute;
          top: 0px;
          left: 0px;
          bottom: 0px;
          right: 0px;
        }`;
      document.getElementsByTagName("head")[0].appendChild(style);
    }
    
    this.className = "appContainer";
    this.innerHTML = '<app-loader show="true"/>';
  }

  get app() {
    return this.getAttribute("label");
  }
  set app(value) {
    if (value !== undefined) this.setAttribute("app", value);
  }

  static get observedAttributes() {
    return ["app"];
  }

  connectedCallback() {
    console.log("Load " + "/"+this.getAttribute("app")+"/manifest.json")
    fetch("/"+this.getAttribute("app")+"/manifest.json")
      .then((r) => r.json())
      .then((m) => {
        console.log(m);
        registerElement(m.short_name, "/"+m["name"] + m["main.js"])
          .then(() => {
            this.innerHTML = "<"+m["name"]+">";
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => console.error(e));
  }
  disconnectedCallback() {}
}
window.customElements.define("app-container", AppContainer);
