import { FunctionComponent, ReactNode } from "react";
import { Link, useLocation } from "wouter";

export const MenuItem: FunctionComponent<{ name: string; path: string, activeFor?: string }> = ({
  name,
  path,
  activeFor,
}) => {
    const [location, _] = useLocation();
    const isActive = location.startsWith(activeFor || path);

  return (
    <Link
      key={path}
      href={path}
      className={isActive ? "nav-link active" : "nav-link"}
    >
      {name}
    </Link>
  );
};

export const Menu: FunctionComponent<{ children?: ReactNode[] }> = ({
  children,
}) => (
  <nav className="navbar navbar-light bg-light navbar-aubergine nav nav-pills nav-fill mb-3">
    {children}
  </nav>
);
