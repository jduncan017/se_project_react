import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <AuthProvider>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </AuthProvider>
      </Switch>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
