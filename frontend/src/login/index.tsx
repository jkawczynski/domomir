import CottageIcon from "@mui/icons-material/Cottage";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

import { TokenData } from "../api/auth.api";
import { storeUserToken } from "../api/tokenStorage";
import { useStateContext } from "../common/context";
import { getToken } from "./api";
import { LoginForm } from "./form";

export const LoginPage: FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const stateContext = useStateContext();
  const mutation = useMutation(getToken, {
    onSuccess: (tokenData: TokenData) => {
      storeUserToken(tokenData);
      stateContext.dispatch({ type: "SET_USER", payload: null });
      setLocation("/");
    },
  });
  const error = mutation?.error as { response: { data: { detail: string } } };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <CottageIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign in to Domomir
        </Typography>
        <LoginForm
          loginError={error?.response?.data?.detail}
          isLoading={mutation.isLoading}
          onSubmit={(loginData) => mutation.mutate(loginData)}
        />
      </Box>
    </Container>
  );
};
