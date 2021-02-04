class BasketList extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      const basketContainer = document.createElement('div');
      basketContainer.className = "basket-container";

      // get attribute values from getters
      //const title = this.title;
      //const addItemText = this.addItemText;
      this.items = [];

      // creating the inner HTML of the editable list element
      basketContainer.innerHTML = `
        <style>
        .basket-container {
          width: 100%;
          text-align: center;
        }
        .item-list {
          list-style: none;
        }
          ul {
            border: 1px solid gray;
          }
          li {}
        </style>
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
      if(m.data != undefined && typeof m.data === "object" && m.data.from === "editable-list") {
        //console.log(m.data);
        if (m.data.action === "add") {
            this.items.push(m.data.value);
          }
          else if (m.data.action === "remove") {
            this.items = this.items.filter((v) => {
              return v != m.data.value;
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
      window.addEventListener("message", this.manageListItem, false);
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