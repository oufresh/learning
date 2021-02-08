import style from "./basket.css";

class BasketList extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      const basketContainer = document.createElement('div');
      basketContainer.id = "basket-container";
      basketContainer.className = "basket-container";
      const styleContainer = document.createElement('style');
      styleContainer.appendChild(document.createTextNode(style));
      shadow.appendChild(styleContainer);
      // get attribute values from getters
      //const title = this.title;
      //const addItemText = this.addItemText;
      this.items = [];

      // creating the inner HTML of the editable list element
      basketContainer.innerHTML = `
        <div>
        <h3>Basket</h3>
        <ul class="item-list">

        </ul>
        <div>
      `;

      // binding methods
      this.manageListItem = this.manageListItem.bind(this);
      this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
      this.render = this.render.bind(this);
      // appending the container to the shadow DOM
      shadow.appendChild(basketContainer);
    }

    // add items to the list
    manageListItem(m) {
      if(m != undefined && typeof m === "object" /*&& m.data.from === "editable-list"*/) {
        console.log(m);
        if (m.action === "add") {
            this.items.push(m.value);
          }
          else if (m.action === "remove") {
            this.items = this.items.filter((v) => {
              return v != m.value;
            });
          }
      }
      this.render();
    }

    render() {
      this.itemList.innerHTML = `${this.items.map(item => `<li>${item}</li>`)}`;
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {

      this.itemList = this.shadowRoot.querySelector('.item-list');
      window.channel.addListener(this.manageListItem);
    }

    // gathering data from element attributes
    get title() {
      return this.getAttribute('title') || '';
    }

    get addItemText() {
      return this.getAttribute('add-item-text') || '';
    }

    handleRemoveItemListeners(arrayOfElements) {
      arrayOfElements.forEach(element => {
        element.addEventListener('click', this.removeListItem, false);
      });
    }

    removeListItem(e) {
      e.target.parentNode.remove();
      console.log(e.target.parentNode.textContent);

    }
    disconnectedCallback() {
      console.log("bye bye micro app");
    }
  }

  // let the browser know about the custom element
  customElements.define('basket-list', BasketList);
  console.log("element basket-list registered");