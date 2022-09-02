import { useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";
import { getToken, TokenData } from "../api/auth.api";
import { storeUserToken } from "../api/tokenStorage";
import { LoginForm } from "./form";

export const LoginComponent: FunctionComponent = () => {
  const [_, setLocation] = useLocation();
  const mutation = useMutation(getToken, {
    onSuccess: (tokenData: TokenData) => {
      storeUserToken(tokenData);
      setLocation("/");
    },
  });
  const error = mutation?.error as { response: { data: { detail: string } } };

  return (
    <div>
      <LoginForm
        loginError={error?.response?.data?.detail}
        isLoading={mutation.isLoading}
        onSubmit={(loginData) => mutation.mutate(loginData)}
      />
    </div>
  );
};
