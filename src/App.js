import React from "react";
import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Form from "../src/components/SignUpForm/SignUp";
import Dashboard from "../src/components/Dashboard/Dashboard";
import ProductForm from "../src/components/ProductForm/ProductForm";
import ProfesionalForm from "../src/components/ProfesionalForm/ProfesionalForm";
import { GlobalProvider } from "./components/AuthState/GlobalContext";

function App() {
  return (
    <div>
      <GlobalProvider>
        <Router>
          <Switch>
            {/* <Route path="/" exact component={Text} /> */}
            <Route path="/" exact component={Form} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Product-Form" component={ProductForm} />
            <Route path="/Profesional-Form" component={ProfesionalForm} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
