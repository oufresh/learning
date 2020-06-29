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
      //loading start of micro app
      setTimeout(() => {
        this.innerHTML = 'LOADED';
      }, 5000);
    }
    disconnectedCallback() {

    }
  }
window.customElements.define("app-container", AppContainer);