class AppArea extends HTMLElement {
    constructor() {
        super();
        this.style.position = "relative";
        this.style.flex = "1 1 auto";
    }
}

window.customElements.define("app-area", AppArea);