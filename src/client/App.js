// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import TestComponent from "./components/TestComponent/TestComponent.js";
// import MealsList from "./components/TestComponent/MealsList.jsx";

// function App() {
//   return (
//     <Router>
//       <Switch>
//       <Route exact path="/">
//         <p>test</p>
//       </Route>
//       <Route exact path="/lol">
//         <p>lol</p>
//       </Route>
//       <Route exact path="/test-component">
//         <TestComponent></TestComponent>
//       </Route>
//       <Route exact path="/meals" component={MealsList} />
//       </Switch>
//      </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/TestComponent/HomePage.jsx"; // Adjust the import path
import MealDetailsPage from "./components/TestComponent/MealDetailsPage.jsx"; // Adjust the import path
import MealsList from "./components/TestComponent/MealsList.jsx"; // Adjust the import path

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/meals" component={MealsList} />
        <Route exact path="/meals/:id">
          <MealDetailsPage />
        </Route>
        {/* Add more routes for additional pages if needed */}
      </Switch>
    </Router>
  );
}

export default App;
