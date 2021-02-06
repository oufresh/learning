import "./appLayout";
import "./appLoader";
import "./appContainer";
import "./appArea";
import "./appContainer";

window.broadcaster = new BroadcastChannel('Consumer');
window.messageReceiver= new BroadcastChannel('Consumer');
class App extends HTMLElement {
    constructor() {
        super();
        this.show = false;
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        window.broadcaster.postMessage("TEST");
        //this.show = !this.show;
        //this.render();
    }

    connectedCallback() {
        window.messageReceiver.onmessage = (ev) =>{ 
            debugger;
            console.log(ev); 
        }
        this.innerHTML = `
        <app-layout>
        <div>
        <h1>Hello Magic list</h1>
        <div><button id="test">TEST</button></div>
        </div><app-area>
        <app-container app="editable-list" /></app-area>
        <app-area>
        <app-container app="basket-list" /></app-area>
        </app-layout>`;
        this.querySelector("#test").addEventListener("click", this.onButtonClick);
        //this.loader = this.querySelector("app-loader");
        //this.render();
    }

    render() {
        //this.loader.show = this.show+"";
    }
    disconnectedCallback() {
        window.bc.close();
        console.log("bye bye");
        alert("bye");
        //window.removeEventListener("message", this.logMessage);
    }
}
window.customElements.define("app-elem", App);