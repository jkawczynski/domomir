import Container from "@mui/material/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Redirect, Route, Router } from "wouter";

import { DomomirAppBar } from "./common/appBar";
import { StateContextProvider } from "./common/context";
import { NestedRouter } from "./common/nested-router";
import { FitnessRouter } from "./fitness/router";
import { RecipesRouter } from "./food/router";
import { LoginPage } from "./login";
import AuthMiddleware from "./middleware";

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <AuthMiddleware>
          <DomomirAppBar />
          <Container maxWidth="lg">
            <Route path="/">
              <Redirect to="/food/recipes" />
            </Route>
            <Route path="/login" component={LoginPage} />
            <Router base="/">
              <NestedRouter base="/food">
                <RecipesRouter />
              </NestedRouter>
              <NestedRouter base="/fitness">
                <FitnessRouter />
              </NestedRouter>
            </Router>
          </Container>
        </AuthMiddleware>
      </StateContextProvider>
    </QueryClientProvider>
  );
};

export default App;
