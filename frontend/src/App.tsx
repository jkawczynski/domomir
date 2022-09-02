import Container from "@mui/material/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { Redirect, Route, Router } from "wouter";
import { StateContextProvider } from "./common/context";

import { AppMenu } from "./common/menu";
import { NestedRouter } from "./common/nested-router";
import { RecipesRouter } from "./food/router";
import { LoginComponent } from "./login/login";
import AuthMiddleware from "./middleware";
import { Shutter } from "./shutter/shutter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <AuthMiddleware>
          <AppMenu />
          <Container maxWidth="lg">
            <Route path="/">
              <Redirect to="/shutter" />
            </Route>
            <Route path="/shutter" component={Shutter} />
            <Route path="/login" component={LoginComponent} />
            <Router base="/">
              <NestedRouter base="/food">
                <RecipesRouter />
              </NestedRouter>
            </Router>
          </Container>
        </AuthMiddleware>
      </StateContextProvider>
    </QueryClientProvider>
  );
};

export default App;
