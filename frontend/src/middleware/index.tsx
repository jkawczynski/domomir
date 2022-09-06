import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, ReactNode } from "react";

import { getAccessToken } from "../api/tokenStorage";
import { getMe } from "../api/user";
import { FullPageLoading } from "../common/components";
import { useStateContext } from "../common/context";

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
