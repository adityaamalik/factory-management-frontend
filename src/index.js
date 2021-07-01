import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import Router from "./router";
import reportWebVitals from "./reportWebVitals";

import axios from "axios";

//production
axios.defaults.baseURL = "https://silvassa-bottling-company.herokuapp.com/";

//development
// axios.defaults.baseURL = "http://localhost:3000";

const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
