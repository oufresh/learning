class AppLoader extends HTMLElement {
    constructor() {
        super();
        this.styleElem = document.createElement('style');
        this.styleElem.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(this.styleElem);
        this.className = 'loader';
        this.styleElem.innerHTML = `
        .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite; /* Safari */
            animation: spin 2s linear infinite;
          }
          
          /* Safari */
          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
    }

    get show() {
      return this.getAttribute("label");
    }
    set show(value) {
      if (value !== undefined) this.setAttribute("show", value);
    }

    static get observedAttributes() {
      return ["show"];
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
      if( name === "show") {
        this.style.display = newVal === "true" ? "block" : "none";
      }
    }

    connectedCallback() {
      
    }
    disconnectedCallback() {
      this.styleElem.parentNode.removeChild(this.styleElem);
    }
}
window.customElements.define("app-loader", AppLoader);