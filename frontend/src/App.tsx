import Container from "@mui/material/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Redirect, Route, Router } from "wouter";
import { StateContextProvider } from "./common/context";

import { DomomirAppBar } from "./common/appBar";
import { NestedRouter } from "./common/nested-router";
import { RecipesRouter } from "./food/router";
import { LoginComponent } from "./login/login";
import AuthMiddleware from "./middleware";
import { FitnessRouter } from "./fitness/router";

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
            <Route path="/login" component={LoginComponent} />
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
