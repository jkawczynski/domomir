import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../common/context";
import { FunctionComponent, ReactNode } from "react";
import { getMe } from "../api/user";
import { Spinner } from "../common/spinner";
import { getRefreshToken } from "../api/tokenStorage";

const AuthMiddleware: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const stateContext = useStateContext();
  const refreshToken = getRefreshToken();


  const query = useQuery(["authUser"], getMe, {
    enabled: !!refreshToken,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  if (query.isLoading && refreshToken) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
