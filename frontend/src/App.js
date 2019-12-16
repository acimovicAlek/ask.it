import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigaton/Navigation";

import "./App.css";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navigation />
        <Switch>
          <Route exact path="/" component={null} />
          <Route exact path="/profile" component={null} />
          <Route exact path="/question" component={null} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
