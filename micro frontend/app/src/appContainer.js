class AppContainer extends HTMLElement {
    constructor() {
      super();
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `.appLayout { 
        background-color: #FFF;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
      }`;
      document.getElementsByTagName('head')[0].appendChild(style);
      this.className = 'appLayout';
    }
    connectedCallback() {
      //loading 
    }
  }
  window.customElements.define("app-container", AppContainer);