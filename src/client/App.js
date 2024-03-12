import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent.js";
import MealsList from "./components/TestComponent/MealsLists.css";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
      <Route exact path="/meals" component={MealsList} />
      </Switch>
     </Router>
  );
}

export default App;
