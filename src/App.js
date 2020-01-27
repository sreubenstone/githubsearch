import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "../src/components/Search";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Search} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
