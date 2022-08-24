import { FunctionComponent } from "react";
import { Router, Route, Redirect } from "wouter";
import { Shutter } from "./shutter/shutter";
import { RecipesRouter } from "./recipes/router";
import { AppMenu } from "./common/menu";
import { NestedRouter } from "./common/nested-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "@mui/material/Container";

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppMenu />
      <Container maxWidth="lg">
        <Route path="/">
          <Redirect to="/shutter" />
        </Route>
        <Route path="/shutter" component={Shutter} />
        <Router base="/">
          <NestedRouter base="/food">
            <RecipesRouter />
          </NestedRouter>
        </Router>
      </Container>
    </QueryClientProvider>
  );
};

export default App;
