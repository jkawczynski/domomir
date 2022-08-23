import { FunctionComponent } from "react";

type PageButtonProps = {
  name: string;
  onClick: React.MouseEventHandler;
  type:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  icon?: string;
};

export const PageButton: FunctionComponent<PageButtonProps> = ({
  name,
  onClick,
  type,
  icon,
}) => {
  let iconEl: React.ReactNode;
  if (icon) {
    const iconClass = `bi-${icon} btn-icon`;
    iconEl = <i className={iconClass}></i>;
  }
  const btnClassName = `btn btn-${type || "primary"}`;
  return (
    <button key={name} type="button" onClick={onClick} className={btnClassName}>
      {iconEl}
      {name}
    </button>
  );
};

export const Page: FunctionComponent<{
  title: string;
  pageButtons?: React.ReactNode[];
  children?: React.ReactNode;
}> = ({
  title,
  pageButtons,
  children,
}) => {
  return (
    <div className="container">
      <div className="col-md-8 mx-auto">
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
  );
};
