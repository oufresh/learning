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

    logMessage(m)
    {
        
        if(m.data != undefined && typeof m.data === "object" && m.data.from === "editable-list") {
            console.log(m.data);
        }
    }

    connectedCallback() {
        this.innerHTML = `
        <app-layout>
        <div>
        <h1>Hello Magic list</h1>
        </div><app-area>
        <app-container app="editable-list" /></app-area>
        <app-area>
        <app-container app="basket-list" /></app-area>
        </app-layout>`;
        //this.querySelector("button").addEventListener("click", this.onButtonClick);
        //this.loader = this.querySelector("app-loader");
        //this.render();
        window.addEventListener("message", this.logMessage, false);
    }

    render() {
        //this.loader.show = this.show+"";
    }
    disconnectedCallback() {
        console.log("bye bye");
        alert("bye");
        //window.removeEventListener("message", this.logMessage);
    }
}
window.customElements.define("app-elem", App);