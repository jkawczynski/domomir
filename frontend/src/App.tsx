import Container from "@mui/material/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Redirect, Route, Router } from "wouter";

import { AppMenu } from "./common/menu";
import { NestedRouter } from "./common/nested-router";
import { RecipesRouter } from "./recipes/router";
import { Shutter } from "./shutter/shutter";

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
