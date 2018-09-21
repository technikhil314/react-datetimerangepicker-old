import ReactDOM from "react-dom";
import React from "react";
import DemoApp from "./app";

ReactDOM.render(<DemoApp />, document.getElementById("app"));

if (module.hot) module.hot.accept();
