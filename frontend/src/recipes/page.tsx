import { Link, useLocation } from "wouter";
import { FunctionComponent } from "react";

export const RecipesMenuItem: FunctionComponent<{
  name: string;
  path: string;
}> = ({ name, path }) => {
  const [location, _] = useLocation();
  const isActive = location.startsWith(path);
  return (
    <Link
      className={
        isActive
          ? "list-group-item list-group-item-action active"
          : "list-group-item list-group-item-action"
      }
      href={path}
    >
      {name}
    </Link>
  );
};

export const RecipesMenu: FunctionComponent = () => {
  return (
    <ul className="list-group mt-2">
      <RecipesMenuItem name="Recipes list" path="/list" />
      <RecipesMenuItem name="Tags" path="/tags" />
    </ul>
  );
};

export const RecipesPage: FunctionComponent<{
  title: string;
  pageButtons?: React.ReactNode[];
  children?: React.ReactNode;
}> = ({ title, pageButtons, children }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <RecipesMenu />
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-between p-2">
            <div className="p-2">
              <h1> {title} </h1>
            </div>
            <div className="p-2">
              <div className="btn-group" role="group">
                {pageButtons}
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
