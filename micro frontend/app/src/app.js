import "./appLayout";
import "./appLoader";
import "./appContainer";
import "./appArea";
import "./appContainer";

class App extends HTMLElement {
    constructor() {
        super();
        this.show = false;
        //this.onButtonClick = this.onButtonClick.bind(this);
    }

    /*onButtonClick() {
        console.log("click");
        this.show = !this.show;
        this.render();
    }*/

    connectedCallback() {
        this.innerHTML = `<app-layout><div><h1>Hello Vanilla!</h1></div><app-area><app-container /></app-area><app-area><app-container /></app-area></app-layout>`;
        //this.querySelector("button").addEventListener("click", this.onButtonClick);
        //this.loader = this.querySelector("app-loader");
        //this.render();
    }

    render() {
        //this.loader.show = this.show+"";
    }
}
window.customElements.define("app-elem", App);