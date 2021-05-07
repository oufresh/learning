import style from "./three-ms-app.css";
import { debounce} from "./utils/debounce";
import { resize, init, dispose } from "./gl/render";

var listener = null;

class ThreeMsApp extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      this.threeContainer = document.createElement('div');
      this.threeContainer.id = "three-container";
      this.threeContainer.className = "three-container";
      const styleContainer = document.createElement('style');
      styleContainer.appendChild(document.createTextNode(style));
      shadow.appendChild(styleContainer);
      // get attribute values from getters
      //const title = this.title;
      //const addItemText = this.addItemText;
      this.width = 0;
      this.height = 0;

      // creating the inner HTML of the editable list element
      this.threeContainer.innerHTML = `<canvas id="glCanvas"></canvas>`;

      // binding methods
      this.resize = this.resize.bind(this);
      this.glCanvas = this.threeContainer.querySelector("#glCanvas");
      // appending the container to the shadow DOM
      shadow.appendChild(this.threeContainer);
    }

    resize() {
      console.log("Resize done");
      resize(this.threeContainer.clientWidth, this.threeContainer.clientHeight);
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      listener = debounce(this.resize);
      window.addEventListener("resize",listener);
      init(this.glCanvas, this.threeContainer.clientWidth, this.threeContainer.clientHeight);
    }

    static get observedAttributes() {
      return ['height'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
       console.log(name +", " + oldValue +" -> " + newValue);
    }

    //nobn passiamo attributi ma calcolliamo le size
    // gathering data from element attributes
    /*set height(newValue) {
      return this.setAttribute(newValue) || this.height;
    }*/

    disconnectedCallback() {
      window.removeEventListener("resize",listener);
      dispose();
      console.log("bye bye micro app");
    }
  }

  // let the browser know about the custom element
  customElements.define('three-ms-app', ThreeMsApp);
  console.log("element basket-list registered");