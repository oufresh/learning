import React, { useState, useCallback, useEffect } from "react";
import { AppMain } from "../layout/AppMain";
import axios from "axios";

const url = "http://localhost:3000/catalog/books";
const basketUrl = "http://localhost:3003/basket/create";
const addBasketUtl = "http://localhost:3003/basket/add";

export const Catalog: React.FC = () => {
  const [response, setResponse] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect( () => {
    async function getBooks() {
      try {
        const resp = await axios.get(url);
        if (resp.status === 200) setResponse(resp.data);
        else setResponse([]);
        await
      } catch (e) {
        setResponse([]);
        console.error(e);
      }
    };
    getBooks();
  },[]);
  const rows = response.map((o: any) => (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ marginRight: "20px" }}>{o.title + " - " + o.author + " - Price: " + o.price}</label>
      <button className="App-button" onClick={() => {}}>
        buy
      </button>
    </div>
  ));
  return (
    <AppMain>
      <fieldset>
        <legend>
          <strong>Catalog</strong>
        </legend>
        {rows}
      </fieldset>
    </AppMain>
  );
};
