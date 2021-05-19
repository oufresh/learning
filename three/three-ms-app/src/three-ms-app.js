import style from "./three-ms-app.css";
import { debounce } from "./utils/debounce";
import { resize, init, dispose, playPause, isPlaying } from "./gl/render";
import { playhtml } from "./controls/play";
import { pausehtml } from "./controls/pause";

var listener = null;

/*⏸ &#x23f8;
⏹ &#x23f9;*/
class ThreeMsApp extends HTMLElement {
  constructor() {
    // establish prototype chain
    super();

    // attaches shadow tree and returns shadow root reference
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    const shadow = this.attachShadow({ mode: "open" });

    //lazy load css
    style.use();

    // creating a container for the editable-list component
    this.threeContainer = document.createElement("div");
    this.threeContainer.id = "three-container";
    this.threeContainer.className = "three-container";
    //const styleContainer = document.createElement("style");
    //styleContainer.appendChild(document.createTextNode(style));
    //shadow.appendChild(styleContainer);
    // get attribute values from getters
    //const title = this.title;
    //const addItemText = this.addItemText;
    this.width = 0;
    this.height = 0;

    // creating the inner HTML of the editable list element
    this.threeContainer.innerHTML = `<canvas id="glCanvas"></canvas><div class="commands fade-in"div><div class="command"><input type="range" min="1" max="100" value="50" class="slider speed"></div><div class="command"><button class="play-pause"></div></div>
        </button></div>`;

    // binding methods
    this.resize = this.resize.bind(this);
    this.onPlayPause = this.onPlayPause.bind(this);
    this.glCanvas = this.threeContainer.querySelector("#glCanvas");
    this.playPause = this.threeContainer.querySelector(".play-pause");
    this.speedSlider = this.threeContainer.querySelector(".speed");
    this.onSpeed= this.onSpeed.bind(this);

    // appending the container to the shadow DOM
    shadow.appendChild(this.threeContainer);
  }

  onSpeed(e) {
    console.log("onSpeed", e);
    console.log("Speed", e.target.value);
  }

  onPlayPause() {
    console.log("play pause");
    playPause();
    if (isPlaying()) 
      this.playPause.innerHTML = pausehtml;
    else 
      this.playPause.innerHTML = playhtml;
  }
  resize() {
    resize(this.threeContainer.clientWidth, this.threeContainer.clientHeight);
  }

  // fires after the element has been attached to the DOM
  connectedCallback() {
    listener = debounce(this.resize);
    window.addEventListener("resize", listener);
    
    this.playPause.addEventListener("click", this.onPlayPause);
    this.speedSlider.addEventListener("input", this.onSpeed);
    init(
      this.glCanvas,
      this.threeContainer.clientWidth,
      this.threeContainer.clientHeight
    );
    this.playPause.innerHTML = pausehtml;
  }

  static get observedAttributes() {
    return ["height"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + ", " + oldValue + " -> " + newValue);
  }

  //nobn passiamo attributi ma calcolliamo le size
  // gathering data from element attributes
  /*set height(newValue) {
      return this.setAttribute(newValue) || this.height;
    }*/

  disconnectedCallback() {
    window.removeEventListener("resize", listener);
    this.playPause.removeEventListener("click", this.onPlayPause);
    this.speedSlider.removeEventListener("input", this.onSpeed);
    dispose();
    console.log("bye bye micro app");
  }
}

// let the browser know about the custom element
customElements.define("three-ms-app", ThreeMsApp);
console.log("element three-ms-app registered");
