import { FunctionComponent } from "react";
import { Router, Route, Redirect } from "wouter";
import { Shutter } from "./shutter/shutter";
import { RecipesRouter } from "./recipes/router";
import { Menu, MenuItem } from "./common/menu";
import { NestedRouter } from "./common/nested-router";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Menu>
        <MenuItem name="Shutter" path="/shutter" />
        <MenuItem name="Recipes" path="/food" />
      </Menu>
      <div className="content-divider"></div>

      <Route path="/">
        <Redirect to="/shutter" />
      </Route>
      <Route path="/shutter" component={Shutter} />
      <Router base="/">
        <NestedRouter base="/food">
          <RecipesRouter />
        </NestedRouter>
      </Router>
    </QueryClientProvider>
  );
};

export default App
