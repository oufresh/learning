import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppRoot, AppHeader, AppTitle } from "./layout";
import { Catalog, Home } from "./pages";
import { Nav } from "./Nav";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoot>
        <AppHeader><AppTitle /></AppHeader>
        <Nav />
        <Switch>
          <Route path="/catalog">
            <Catalog />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AppRoot>
    </Router>
  );
};

export default App;
