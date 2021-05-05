import style from "./three-ms-app.css";
import { debounce} from "./utils/debounce";

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
      this.gl =null;

      // creating the inner HTML of the editable list element
      this.threeContainer.innerHTML = `<canvas id="glCanvas"></canvas>
      `;

      // binding methods
      this.render = this.render.bind(this);
      this.resize = this.resize.bind(this);
      this.updateCanvas =this.updateCanvas.bind(this);
      this.glCanvas = this.threeContainer.querySelector("#glCanvas");
      // appending the container to the shadow DOM
      shadow.appendChild(this.threeContainer);
    }

    render() {
      console.log("render ...");
        // Set clear color to black, fully opaque
      this.gl.clearColor(100.0, 0.0, 100.0, 1.0);
      // Clear the color buffer with specified clear color
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    resize() {
      console.log("Resize done");
      console.log(this.threeContainer.clientHeight);
      console.log(this.threeContainer.clientWidth);
      this.updateCanvas();
    }

    updateCanvas() {
      this.width = this.threeContainer.clientWidth;
      this.height = this.threeContainer.clientHeight;
      this.glCanvas.setAttribute("height", this.height+"");
      this.glCanvas.setAttribute("width", this.width+"");
      this.gl = this.glCanvas.getContext("webgl");

      this.render();
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      listener = debounce(this.resize);
      window.addEventListener("resize",listener);
      this.updateCanvas();
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
      console.log("bye bye micro app");
    }
  }

  // let the browser know about the custom element
  customElements.define('three-ms-app', ThreeMsApp);
  console.log("element basket-list registered");