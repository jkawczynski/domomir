import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../common/context";
import { FunctionComponent, ReactNode } from "react";
import { getMe } from "../api/user";
import { getAccessToken } from "../api/tokenStorage";
import { FullPageLoading } from "../common/components";

const AuthMiddleware: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const stateContext = useStateContext();
  const accessToken = getAccessToken();

  const query = useQuery(["authUser"], getMe, {
    enabled: !!accessToken,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  if (query.isLoading && accessToken) {
    return <FullPageLoading />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
