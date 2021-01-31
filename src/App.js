import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Index";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
