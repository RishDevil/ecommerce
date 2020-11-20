import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import BaseLayout from "./component/BaseLayout";
import Router from "./router/Route";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BaseLayout>
          <Router />
        </BaseLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
