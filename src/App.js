import React from "react";
import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Text from "../src/components/Test";
import Dashboard from "../src/components/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Text} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
