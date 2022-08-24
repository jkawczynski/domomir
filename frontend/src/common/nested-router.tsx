import { FunctionComponent, ReactElement } from "react";
import { Router, useLocation, useRouter } from "wouter";

export const NestedRouter: FunctionComponent<{
  base: string;
  children?: ReactElement;
}> = ({ base, children }) => {
  const [parentLocation] = useLocation();
  const router = useRouter();
  const nestedBase = router.base === "/" ? base : `${router.base}${base}`;

  if (!`/${parentLocation}`.startsWith(nestedBase)) return null;

  return (
    <Router base={nestedBase} key={nestedBase}>
      {children}
    </Router>
  );
};
