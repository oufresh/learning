//import Systemjs from "systemjs";

class AppContainer extends HTMLElement {
    constructor() {
      super();
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `.appContainer { 
        background-color: #FFF;
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
      }`;
      document.getElementsByTagName('head')[0].appendChild(style);
      this.className = 'appContainer';
      this.innerHTML = '<app-loader show="true"/>';
    }
    connectedCallback() {
      fetch("/micro/manifest.json").then(r => r.json()).then(m => console.log(m)).catch(e => console.error(e));
      //loading start of micro app
      /*Systemjs.import("/micro/bundle.js").then(() => {
        console.log("LOADED manifest");
      }).catch(e => console.error(e));*/
      setTimeout(() => {
        this.innerHTML = 'LOADED';
      }, 5000);
    }
    disconnectedCallback() {

    }
  }
window.customElements.define("app-container", AppContainer);