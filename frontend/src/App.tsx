import Container from "@mui/material/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Redirect, Route, Router } from "wouter";

import { DomomirAppBar } from "./common/appBar";
import { NestedRouter } from "./common/nested-router";
import { RecipesRouter } from "./food/router";

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DomomirAppBar />
      <Container maxWidth="lg">
        <Route path="/">
          <Redirect to="/food/recipes" />
        </Route>
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
