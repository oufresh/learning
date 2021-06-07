import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./view/App";
import AllInclusiveBroadcaster from "./channel";

//channel
(window as any).channel = new AllInclusiveBroadcaster();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
