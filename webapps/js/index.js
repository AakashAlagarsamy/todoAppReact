import React from "react";
import ReactDOM from "react-dom";
import "./../css/index.scss";
import "./../assets/fonts/Poppins-Regular.ttf";
import MainContainer from "./components/mainContainer";

ReactDOM.render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>,
  document.getElementById("root")
);

module.hot.accept();
